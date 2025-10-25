import { get, set, del, clear, keys } from 'idb-keyval';
import { modelLoader } from './modelLoader';
import nlp from 'compromise';

export interface VectorDocument {
  id: string;
  content: string;
  embedding: number[];
  metadata: {
    source: string;
    timestamp: number;
    tokens: number;
  };
}

export interface SearchResult {
  document: VectorDocument;
  score: number;
  relevance: 'high' | 'medium' | 'low';
}

class LocalVectorStore {
  private readonly STORE_PREFIX = 'vector_doc_';
  private readonly INDEX_KEY = 'vector_index';

  private async getAllDocIds(): Promise<string[]> {
    const index = await get(this.INDEX_KEY);
    return index || [];
  }

  private async updateIndex(docIds: string[]): Promise<void> {
    await set(this.INDEX_KEY, docIds);
  }

  async addDocument(
    content: string,
    metadata: { source: string; [key: string]: any }
  ): Promise<string> {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Load embedding model if not already loaded
    const embeddingPipeline = await modelLoader.loadEmbeddings();
    
    // Generate embedding
    const output = await embeddingPipeline(content, {
      pooling: 'mean',
      normalize: true,
    });
    
    const embedding = Array.from(output.data as Float32Array);

    // Count tokens (rough estimate)
    const tokens = content.split(/\s+/).length;

    const document: VectorDocument = {
      id,
      content,
      embedding,
      metadata: {
        source: metadata.source,
        timestamp: Date.now(),
        tokens,
        ...metadata,
      },
    };

    // Store document
    await set(`${this.STORE_PREFIX}${id}`, document);

    // Update index
    const docIds = await this.getAllDocIds();
    docIds.push(id);
    await this.updateIndex(docIds);

    return id;
  }

  async addDocuments(documents: Array<{ content: string; source: string }>): Promise<string[]> {
    const ids: string[] = [];
    for (const doc of documents) {
      const id = await this.addDocument(doc.content, { source: doc.source });
      ids.push(id);
    }
    return ids;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;
    
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private lexicalScore(query: string, content: string): number {
    const queryDoc = nlp(query.toLowerCase());
    const contentDoc = nlp(content.toLowerCase());
    
    const queryTerms = queryDoc.terms().out('array');
    const contentTerms = contentDoc.terms().out('array');
    
    let matches = 0;
    queryTerms.forEach(term => {
      if (contentTerms.includes(term)) {
        matches++;
      }
    });

    return matches / Math.max(queryTerms.length, 1);
  }

  async search(query: string, k: number = 5): Promise<SearchResult[]> {
    // Load embedding model
    const embeddingPipeline = await modelLoader.loadEmbeddings();
    
    // Generate query embedding
    const output = await embeddingPipeline(query, {
      pooling: 'mean',
      normalize: true,
    });
    const queryEmbedding = Array.from(output.data as Float32Array);

    // Get all documents
    const docIds = await this.getAllDocIds();
    const results: SearchResult[] = [];

    for (const docId of docIds) {
      const doc = await get<VectorDocument>(`${this.STORE_PREFIX}${docId}`);
      if (!doc) continue;

      // Compute cosine similarity
      const cosineSim = this.cosineSimilarity(queryEmbedding, doc.embedding);
      
      // Compute lexical score
      const lexicalSim = this.lexicalScore(query, doc.content);

      // Hybrid score (70% cosine, 30% lexical)
      const score = cosineSim * 0.7 + lexicalSim * 0.3;

      // Determine relevance
      let relevance: 'high' | 'medium' | 'low' = 'low';
      if (score > 0.7) relevance = 'high';
      else if (score > 0.4) relevance = 'medium';

      results.push({ document: doc, score, relevance });
    }

    // Sort by score and return top k
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }

  async getDocument(id: string): Promise<VectorDocument | null> {
    return await get<VectorDocument>(`${this.STORE_PREFIX}${id}`) || null;
  }

  async deleteDocument(id: string): Promise<void> {
    await del(`${this.STORE_PREFIX}${id}`);
    
    // Update index
    const docIds = await this.getAllDocIds();
    const filtered = docIds.filter(docId => docId !== id);
    await this.updateIndex(filtered);
  }

  async clearStore(): Promise<void> {
    const docIds = await this.getAllDocIds();
    for (const docId of docIds) {
      await del(`${this.STORE_PREFIX}${docId}`);
    }
    await del(this.INDEX_KEY);
  }

  async getStats(): Promise<{
    documentCount: number;
    estimatedSize: number;
  }> {
    const docIds = await this.getAllDocIds();
    
    // Estimate size (rough calculation)
    let totalSize = 0;
    for (const docId of docIds) {
      const doc = await get<VectorDocument>(`${this.STORE_PREFIX}${docId}`);
      if (doc) {
        // Rough size: content + embedding array + metadata
        totalSize += doc.content.length * 2; // 2 bytes per char
        totalSize += doc.embedding.length * 4; // 4 bytes per float32
        totalSize += 200; // metadata overhead
      }
    }

    return {
      documentCount: docIds.length,
      estimatedSize: Math.floor(totalSize / 1024), // in KB
    };
  }
}

export const vectorStore = new LocalVectorStore();

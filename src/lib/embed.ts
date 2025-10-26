let extractor: any | null = null;

async function getExtractor() {
  if (extractor) return extractor;
  // dynamic import to keep cold starts low
  const { pipeline } = await import("@huggingface/transformers");
  extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  return extractor;
}

// Mean-pool last hidden state to a single vector
function meanPool(tensor: number[][]) {
  const d = tensor[0].length;
  const out = new Float32Array(d);
  for (const token of tensor) {
    for (let i = 0; i < d; i++) out[i] += token[i];
  }
  for (let i = 0; i < d; i++) out[i] /= tensor.length;
  return out;
}

export async function embed(text: string) {
  const ex = await getExtractor();
  // returns shape [tokens, dim]
  const data: number[][] = await ex(text, { pooling: "none", normalize: true });
  return meanPool(data);
}

export function cosine(a: Float32Array, b: Float32Array) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { 
    dot += a[i]*b[i]; 
    na += a[i]*a[i]; 
    nb += b[i]*b[i]; 
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

export function jaccard(a: string[] = [], b: string[] = []) {
  const A = new Set(a), B = new Set(b);
  const inter = [...A].filter(x => B.has(x)).length;
  const union = A.size + B.size - inter || 1;
  return inter / union;
}
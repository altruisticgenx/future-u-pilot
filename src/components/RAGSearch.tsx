import { useState } from "react";
import { Search, FileText, Loader2, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { vectorStore, SearchResult } from "@/services/localVectorStore";
import { useLocalAI } from "@/contexts/LocalAIContext";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";

export const RAGSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [newDocument, setNewDocument] = useState("");
  const [isIndexing, setIsIndexing] = useState(false);
  const { loadEmbeddings, refreshVectorStoreStats, vectorStoreStats } = useLocalAI();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    const startTime = Date.now();

    try {
      await loadEmbeddings();
      const searchResults = await vectorStore.search(query, 5);
      setResults(searchResults);

      const avgScore = searchResults.reduce((sum, r) => sum + r.score, 0) / searchResults.length;
      posthog.capture('rag_search_performed', {
        query_length: query.length,
        results_count: searchResults.length,
        avg_relevance_score: avgScore.toFixed(3),
        search_time_ms: Date.now() - startTime,
      });

      if (searchResults.length === 0) {
        toast.info("No results found. Try adding documents first.");
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddDocument = async () => {
    if (!newDocument.trim()) {
      toast.error("Please enter document content");
      return;
    }

    setIsIndexing(true);

    try {
      await loadEmbeddings();
      await vectorStore.addDocument(newDocument.trim(), {
        source: 'manual',
      });

      await refreshVectorStoreStats();
      setNewDocument("");
      toast.success("Document indexed successfully!");

      posthog.capture('rag_document_indexed', {
        content_length: newDocument.length,
        source: 'manual',
      });
    } catch (error) {
      console.error('Indexing error:', error);
      toast.error("Failed to index document");
    } finally {
      setIsIndexing(false);
    }
  };

  const handleClearStore = async () => {
    if (!confirm("Delete all indexed documents?")) return;

    try {
      await vectorStore.clearStore();
      await refreshVectorStoreStats();
      setResults([]);
      toast.success("Knowledge base cleared");
    } catch (error) {
      console.error('Clear error:', error);
      toast.error("Failed to clear knowledge base");
    }
  };

  const getRelevanceBadge = (relevance: 'high' | 'medium' | 'low') => {
    const variants = {
      high: "bg-green-500/20 text-green-500 border-green-500/50",
      medium: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
      low: "bg-gray-500/20 text-gray-500 border-gray-500/50",
    };
    return (
      <Badge variant="outline" className={variants[relevance]}>
        {relevance}
      </Badge>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-mono text-primary">RAG Knowledge Base</CardTitle>
            <CardDescription className="font-mono text-xs">
              Search your indexed documents • {vectorStoreStats.documentCount} docs • {vectorStoreStats.estimatedSize}KB
            </CardDescription>
          </div>
          {vectorStoreStats.documentCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearStore}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="search">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search" className="font-mono text-xs">
              <Search className="w-3 h-3 mr-2" />
              Search
            </TabsTrigger>
            <TabsTrigger value="index" className="font-mono text-xs">
              <Plus className="w-3 h-3 mr-2" />
              Add Document
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your knowledge base..."
                disabled={isSearching}
                className="font-mono text-sm"
              />
              <Button type="submit" disabled={isSearching || !query.trim()}>
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </form>

            {results.length > 0 && (
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  <AnimatePresence>
                    {results.map((result, idx) => (
                      <motion.div
                        key={result.document.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Card className="border-muted">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="font-mono text-xs text-muted-foreground">
                                  {result.document.metadata.source}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getRelevanceBadge(result.relevance)}
                                <Badge variant="outline" className="font-mono text-xs">
                                  {(result.score * 100).toFixed(0)}%
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm leading-relaxed">
                              {result.document.content.slice(0, 300)}
                              {result.document.content.length > 300 && '...'}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="index" className="space-y-4">
            <div className="space-y-3">
              <Textarea
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                placeholder="Paste document content here..."
                disabled={isIndexing}
                className="font-mono text-sm min-h-[200px]"
              />
              <Button
                onClick={handleAddDocument}
                disabled={!newDocument.trim() || isIndexing}
                className="w-full"
              >
                {isIndexing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Indexing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Index Document
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

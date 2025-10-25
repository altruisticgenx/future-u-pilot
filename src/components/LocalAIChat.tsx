import { useState, useRef, useEffect } from "react";
import { Send, Loader2, AlertCircle, Cloud } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { useLocalAI } from "@/contexts/LocalAIContext";
import { modelLoader } from "@/services/modelLoader";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const LocalAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { models, loadLLM, setMode, trackInference } = useLocalAI();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    try {
      // Load model if not ready
      if (models.llm.status !== 'ready') {
        await loadLLM();
      }

      const engine = modelLoader.getLoadedModels().llm;
      if (!engine) throw new Error('Model not loaded');

      const startTime = Date.now();
      let assistantContent = "";
      let tokenCount = 0;

      // Create completion with streaming
      const completion = await engine.chat.completions.create({
        messages: [...messages, userMessage].map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      });

      // Add empty assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Stream tokens
      for await (const chunk of completion) {
        const delta = chunk.choices[0]?.delta?.content || '';
        if (delta) {
          assistantContent += delta;
          tokenCount++;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
        }
      }

      // Track performance
      const latency = Date.now() - startTime;
      trackInference(latency, tokenCount);
    } catch (error) {
      console.error('Local AI error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error instanceof Error ? error.message : 'Failed to generate response'}`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSwitchToCloud = () => {
    setMode('cloud');
  };

  // Show loading UI if model is loading
  if (models.llm.status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="text-center space-y-2">
          <p className="font-mono text-sm text-primary">
            Downloading AI Model...
          </p>
          <p className="text-xs text-muted-foreground">
            {models.llm.name}
          </p>
          <Progress value={models.llm.progress} className="w-64" />
          <p className="text-xs font-mono text-muted-foreground">
            {Math.round(models.llm.progress)}%
          </p>
        </div>
      </div>
    );
  }

  // Show error UI if model failed
  if (models.llm.status === 'error') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-semibold">Failed to load local AI model</p>
            <p className="text-sm">{models.llm.error}</p>
            <Button
              onClick={handleSwitchToCloud}
              variant="outline"
              size="sm"
              className="mt-2"
            >
              <Cloud className="w-4 h-4 mr-2" />
              Switch to Cloud AI
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b bg-card/50">
        <div className="space-y-1">
          <h3 className="font-mono text-sm font-semibold text-primary">
            On-Device AI
          </h3>
          <p className="text-xs text-muted-foreground">
            100% private • {models.llm.name}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSwitchToCloud}
          className="font-mono text-xs"
        >
          <Cloud className="w-3 h-3 mr-1" />
          Cloud
        </Button>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <AnimatePresence>
          {messages.map((message, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mb-4 flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2 font-mono text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-muted-foreground"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-xs font-mono">Generating...</span>
          </motion.div>
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-card/50">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything... (100% private)"
            disabled={isGenerating || models.llm.status !== 'ready'}
            className="font-mono text-sm"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isGenerating}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

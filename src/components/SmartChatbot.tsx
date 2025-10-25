import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Cloud, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useLocalAI } from "@/contexts/LocalAIContext";
import { modelLoader } from "@/services/modelLoader";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface Message {
  role: "user" | "assistant";
  content: string;
  images?: Array<{ type: "image_url"; image_url: { url: string } }>;
}

export const SmartChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Future-U Assistant. I can help you with quantum-AI solutions, policy compliance, and more. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { mode, setMode, models, loadLLM, trackInference, webgpuCapabilities } = useLocalAI();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const streamCloudChat = async (userMessage: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        }
      );

      if (response.status === 429) {
        toast({
          title: "Rate Limit",
          description: "Too many requests. Please wait a moment.",
          variant: "destructive",
        });
        setMessages([...newMessages, {
          role: "assistant",
          content: "I'm experiencing high demand. Please try again in a moment.",
        }]);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantMessage = "";
      let streamDone = false;

      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            const images = parsed.choices?.[0]?.message?.images;
            
            if (content) {
              assistantMessage += content;
            }
            
            const updatedMessage: Message = {
              role: "assistant",
              content: assistantMessage || "Here's the generated image:",
            };
            
            if (images && images.length > 0) {
              updatedMessage.images = images;
            }
            
            setMessages([...newMessages, updatedMessage]);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      setMessages([...newMessages, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const streamLocalChat = async (userMessage: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);

    try {
      if (models.llm.status !== 'ready') {
        await loadLLM();
      }

      const engine = modelLoader.getLoadedModels().llm;
      if (!engine) throw new Error('Model not loaded');

      const startTime = Date.now();
      let assistantContent = "";
      let tokenCount = 0;

      const completion = await engine.chat.completions.create({
        messages: newMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      });

      setMessages([...newMessages, { role: "assistant", content: "" }]);

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

      const latency = Date.now() - startTime;
      trackInference(latency, tokenCount);
    } catch (error) {
      console.error('Local AI error:', error);
      toast({
        title: "Error",
        description: "Failed to generate response. Switching to Cloud AI.",
        variant: "destructive",
      });
      setMode('cloud');
      await streamCloudChat(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    if (mode === 'cloud') {
      await streamCloudChat(userMessage);
    } else {
      await streamLocalChat(userMessage);
    }
  };

  const isModelLoading = mode === 'local' && models.llm.status === 'loading';

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="btn-3d-teal rounded-full h-14 w-14 shadow-2xl hover:shadow-primary/50"
              aria-label="Open AI Assistant"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] z-50 flex flex-col glass-card-3d rounded-2xl border-2 border-primary/30 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Future-U Assistant</h3>
                  <p className="text-white/80 text-xs">
                    {mode === 'cloud' ? 'Cloud AI' : 'On-Device AI'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* AI Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMode(mode === 'cloud' ? 'local' : 'cloud')}
                  className={cn(
                    "text-white hover:bg-white/20 h-8 px-2 gap-1",
                    !webgpuCapabilities.supported && mode === 'cloud' && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!webgpuCapabilities.supported && mode === 'cloud'}
                  title={mode === 'cloud' ? 'Switch to On-Device AI' : 'Switch to Cloud AI'}
                >
                  {mode === 'cloud' ? (
                    <>
                      <Cloud className="w-3 h-3" />
                      <span className="text-xs">Cloud</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-3 h-3" />
                      <span className="text-xs">Local</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Model Loading Progress */}
            {isModelLoading && (
              <div className="p-4 bg-muted/50 border-b border-border">
                <div className="space-y-2">
                  <p className="text-xs font-mono text-primary">Downloading AI Model...</p>
                  <Progress value={models.llm.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(models.llm.progress)}%</p>
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      {msg.images && msg.images.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.images.map((img, imgIdx) => (
                            <img
                              key={imgIdx}
                              src={img.image_url.url}
                              alt="Generated visualization"
                              className="rounded-lg max-w-full h-auto border border-border shadow-lg"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-2xl">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'local' ? "Ask anything (100% private)..." : "Ask anything or request an image..."}
                  disabled={isLoading || isModelLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim() || isModelLoading}
                  className="btn-3d-teal"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { useEffect, useState } from "react";
import chroma from "chroma-js";
import { AlertCircle, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContrastResult {
  element: string;
  textColor: string;
  backgroundColor: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
}

export const ContrastMonitor = () => {
  const [results, setResults] = useState<ContrastResult[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    const checkContrast = () => {
      const elements = document.querySelectorAll("[class*='text-']");
      const newResults: ContrastResult[] = [];

      elements.forEach((el) => {
        try {
          const computed = window.getComputedStyle(el);
          const textColor = computed.color;
          const bgColor = computed.backgroundColor;

          // Skip transparent backgrounds
          if (bgColor === "rgba(0, 0, 0, 0)" || bgColor === "transparent") return;

          const ratio = chroma.contrast(textColor, bgColor);
          
          // Only track significant color combinations
          if (ratio < 10) {
            newResults.push({
              element: el.className.split(" ").slice(0, 3).join(" "),
              textColor,
              backgroundColor: bgColor,
              ratio: Math.round(ratio * 10) / 10,
              wcagAA: ratio >= 4.5,
              wcagAAA: ratio >= 7,
            });
          }
        } catch (error) {
          // Skip elements that can't be processed
        }
      });

      // Remove duplicates
      const unique = newResults.filter(
        (result, index, self) =>
          index === self.findIndex((r) => r.element === result.element)
      );

      setResults(unique.slice(0, 10)); // Limit to 10 results
    };

    checkContrast();

    // Keyboard shortcut: Alt+C
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "c") {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (process.env.NODE_ENV !== "development" || !isVisible) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[500px] overflow-auto z-50 shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Color Contrast Monitor
          </CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Press Alt+C to toggle • Dev mode only
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {results.length === 0 ? (
          <div className="text-xs text-center py-4 text-muted-foreground">
            All color combinations meet WCAG guidelines ✓
          </div>
        ) : (
          results.map((result, index) => (
            <div
              key={index}
              className={cn(
                "p-2 rounded-lg border text-xs space-y-1",
                result.wcagAA
                  ? "border-success/50 bg-success/5"
                  : "border-error/50 bg-error/5"
              )}
            >
              <div className="font-mono truncate">{result.element}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: result.textColor }}
                  />
                  <span className="text-muted-foreground">on</span>
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: result.backgroundColor }}
                  />
                </div>
                <div className="font-bold">{result.ratio}:1</div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                {result.wcagAA ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <X className="h-3 w-3 text-error" />
                )}
                <span className={result.wcagAA ? "text-success" : "text-error"}>
                  WCAG AA {result.wcagAA ? "Pass" : "Fail"}
                </span>
                {result.wcagAAA && (
                  <span className="text-success ml-2">AAA ✓</span>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

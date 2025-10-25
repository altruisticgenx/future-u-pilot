import { Layers } from "lucide-react";

interface LayerControlProps {
  layers: Record<string, boolean>;
  onToggle: (key: string) => void;
}

export default function LayerControl({ layers, onToggle }: LayerControlProps) {
  return (
    <div className="pointer-events-auto rounded-xl bg-card/90 backdrop-blur-md border border-primary/20 p-3 space-y-3 text-xs shadow-lg max-w-xs">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Layers className="h-4 w-4 text-primary" />
        <span>Map Layers</span>
      </div>
      <div className="space-y-2">
        {Object.entries(layers).map(([key, value]) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
            <input 
              type="checkbox" 
              checked={value} 
              onChange={() => onToggle(key)} 
              className="rounded border-primary/30 text-primary focus:ring-primary focus:ring-offset-0"
            />
            <span className="text-foreground/90">{key}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

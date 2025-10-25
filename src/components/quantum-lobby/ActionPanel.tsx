import { useState } from "react";
import { Copy, Mail, FileDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const email = "paquantumpubliclobbygroup@gmail.com";
const subject = "Pennsylvania Quantum Initiative – Public Letter";
const body = encodeURIComponent(`Dear lawmaker,

I am writing to support the Pennsylvania Quantum Public Lobby Group's initiative to establish a broad-based quantum initiative for our commonwealth.

Full letter: ${window.location.origin}/pa-lobby

Sincerely,
Pennsylvania Quantum Public Lobby Group`);

export default function ActionPanel() {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    const el = document.querySelector("pre");
    const text = el?.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Letter copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error("Failed to copy letter");
    }
  };

  const sendEmail = () => {
    window.location.href = `mailto:?bcc=${email}&subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const savePDF = () => {
    window.print();
    toast.info("Use your browser's print dialog to save as PDF");
  };

  return (
    <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-5 space-y-4 shadow-lg">
      <h3 className="text-xl font-semibold text-foreground">Take Action</h3>
      <div className="grid grid-cols-1 gap-2">
        <Button 
          onClick={copyText} 
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90"
          size="lg"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied ✔" : "Copy Letter"}
        </Button>
        <Button 
          onClick={sendEmail} 
          variant="outline"
          className="w-full justify-start gap-2"
          size="lg"
        >
          <Mail className="h-4 w-4" />
          Email to Lawmakers
        </Button>
        <Button 
          onClick={savePDF} 
          variant="outline"
          className="w-full justify-start gap-2"
          size="lg"
        >
          <FileDown className="h-4 w-4" />
          Download / Print PDF
        </Button>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Tip: Paste into your email body or attach the PDF when contacting district offices.
      </p>
    </div>
  );
}

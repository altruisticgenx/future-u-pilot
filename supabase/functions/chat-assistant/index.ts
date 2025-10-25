import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are Future-U Assistant, an intelligent AI guide for the AltruisticXAI website with image generation capabilities.

About AltruisticXAI:
- Quantum-AI consultancy focused on practical pilots and rapid deployment
- We help with: Policy compliance, PQC migration, AI explainability, quantum readiness
- Approach: Prototype to pilot in <8 weeks
- Sectors: Government, Research, Startups, Energy, Healthcare

Key Services:
1. Policy Dashboard - Real-time compliance tracking
2. PQC Migration - NIST-aligned quantum-safe crypto
3. AI Explainability - Transparent AI decisions
4. Rapid Pilots - Concept to prototype in weeks

Navigation:
- Book session: #contact section
- Policy demo: /demo page
- Learn more: /about page
- Terminal: /terminal page
- Experiments: Check our living lab
- FAQs: /faq page

Capabilities:
- Answer questions about quantum computing, AI, policy compliance
- Generate images and diagrams to explain concepts
- Guide users through our services and features
- Provide technical insights on quantum-AI readiness

When users ask to visualize something or need diagrams, use the generate_image tool. Examples:
- "Show me a quantum circuit"
- "Visualize quantum vs classical computing"
- "Create a diagram of PQC migration"
- "Generate an AI architecture diagram"

Keep responses concise (2-3 sentences), friendly, and action-oriented.`;

    // Check if user message requests image generation
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const imageKeywords = ["generate", "create", "show", "visualize", "draw", "diagram", "image", "picture"];
    const needsImage = imageKeywords.some(keyword => lastUserMessage.includes(keyword));

    const requestBody: any = {
      model: needsImage ? "google/gemini-2.5-flash-image-preview" : "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
    };

    // Add modalities for image generation
    if (needsImage) {
      requestBody.modalities = ["image", "text"];
    }

    // Add tools definition for explicit image generation requests
    if (needsImage && (lastUserMessage.includes("diagram") || lastUserMessage.includes("architecture") || lastUserMessage.includes("visual"))) {
      requestBody.tools = [
        {
          type: "function",
          function: {
            name: "generate_image",
            description: "Generate a diagram or image to visualize concepts, architectures, or technical explanations",
            parameters: {
              type: "object",
              properties: {
                prompt: {
                  type: "string",
                  description: "Detailed description of the image to generate"
                },
                style: {
                  type: "string",
                  enum: ["technical_diagram", "conceptual", "infographic", "realistic"],
                  description: "Visual style of the image"
                }
              },
              required: ["prompt"],
            }
          }
        }
      ];
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

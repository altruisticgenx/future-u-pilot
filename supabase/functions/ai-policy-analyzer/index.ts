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
    const { policyText, analysisType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!policyText) {
      throw new Error("Policy text is required");
    }

    console.log("Analyzing policy, type:", analysisType);

    const systemPrompts = {
      compliance: `You are a policy compliance expert. Analyze the provided policy text and identify:
1. Key compliance requirements
2. Potential gaps or ambiguities
3. Recommended actions to ensure compliance
4. Risk level (Low/Medium/High)

Provide a structured analysis with clear, actionable insights.`,
      
      pqc: `You are a Post-Quantum Cryptography expert. Analyze the provided policy/system description and identify:
1. Current cryptographic systems at risk from quantum attacks
2. Priority items for PQC migration (based on NIST standards)
3. Timeline recommendations
4. Implementation complexity (Low/Medium/High)

Provide practical migration steps.`,
      
      risk: `You are a risk assessment expert. Analyze the provided policy/system and identify:
1. Security vulnerabilities
2. Operational risks
3. Compliance risks
4. Mitigation strategies
5. Overall risk score (1-10)

Provide prioritized recommendations.`,
    };

    const systemPrompt = systemPrompts[analysisType as keyof typeof systemPrompts] || systemPrompts.compliance;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: policyText }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${errorText}`);
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    if (!analysis) {
      throw new Error("No analysis generated");
    }

    return new Response(
      JSON.stringify({ 
        analysis,
        analysisType,
        timestamp: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Policy analysis error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

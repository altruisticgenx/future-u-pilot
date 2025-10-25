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
    const { url, action } = await req.json();
    
    if (!url) {
      throw new Error("URL is required");
    }

    // Clean and validate URL - remove angle brackets and ensure https://
    const cleanUrl = url.trim().replace(/^<|>$/g, '');
    const validUrl = cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`;

    console.log(`Scraping URL: ${validUrl}, Action: ${action}`);

    // Fetch the webpage
    const response = await fetch(validUrl, {
      headers: {
        'User-Agent': 'AltruisticXAI-Terminal/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    
    // Extract basic metadata
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Unknown';
    
    // Extract meta description
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1] : '';
    
    // Get content length
    const contentLength = new TextEncoder().encode(html).length;
    
    // Extract all text content (simplified)
    const textContent = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 2000); // Limit to first 2000 chars

    const result: any = {
      url,
      title,
      description,
      contentLength,
      preview: textContent,
      timestamp: new Date().toISOString(),
      status: 'success'
    };

    // If using Lovable AI, analyze the content
    if (action === 'analyze') {
      const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
      
      if (LOVABLE_API_KEY) {
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { 
                role: "system", 
                content: "You are a technical analyst specializing in quantum computing, AI, and policy. Provide concise summaries and key insights." 
              },
              { 
                role: "user", 
                content: `Analyze this webpage content and extract key insights:\n\nTitle: ${title}\nDescription: ${description}\nContent: ${textContent}` 
              }
            ],
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          result.analysis = aiData.choices?.[0]?.message?.content || 'Analysis complete';
        }
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Scraper error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        status: 'error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

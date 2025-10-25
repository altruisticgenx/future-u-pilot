import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Real API endpoints for quantum/AI data
const API_ENDPOINTS = {
  arxiv: "https://export.arxiv.org/api/query",
  github: "https://api.github.com",
  nist: "https://www.nist.gov/api",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { source, query, params } = await req.json();
    
    console.log(`API Proxy: ${source}, Query: ${query}`);

    let apiUrl: string;
    let apiData: any;

    switch (source) {
      case 'arxiv':
        // Search arXiv for quantum computing papers
        apiUrl = `${API_ENDPOINTS.arxiv}?search_query=${encodeURIComponent(query || 'quantum computing')}&max_results=10&sortBy=submittedDate&sortOrder=descending`;
        const arxivResponse = await fetch(apiUrl);
        const arxivXml = await arxivResponse.text();
        
        // Parse XML to extract paper info (simplified)
        const entries = arxivXml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
        apiData = {
          source: 'arXiv',
          count: entries.length,
          query: query || 'quantum computing',
          papers: entries.slice(0, 5).map((entry, i) => {
            const titleMatch = entry.match(/<title>(.*?)<\/title>/);
            const authorMatch = entry.match(/<name>(.*?)<\/name>/);
            const summaryMatch = entry.match(/<summary>(.*?)<\/summary>/s);
            return {
              id: i + 1,
              title: titleMatch ? titleMatch[1].trim() : 'Unknown',
              author: authorMatch ? authorMatch[1].trim() : 'Unknown',
              summary: summaryMatch ? summaryMatch[1].trim().substring(0, 200) + '...' : ''
            };
          })
        };
        break;

      case 'github':
        // Search GitHub for quantum repos
        const searchQuery = query || 'quantum computing';
        apiUrl = `${API_ENDPOINTS.github}/search/repositories?q=${encodeURIComponent(searchQuery + ' language:python')}&sort=stars&order=desc&per_page=10`;
        const githubResponse = await fetch(apiUrl, {
          headers: {
            'User-Agent': 'AltruisticXAI-Terminal',
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        const githubData = await githubResponse.json();
        apiData = {
          source: 'GitHub',
          count: githubData.total_count || 0,
          query: searchQuery,
          repositories: (githubData.items || []).slice(0, 5).map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login,
            stars: repo.stargazers_count,
            description: repo.description,
            url: repo.html_url,
            language: repo.language
          }))
        };
        break;

      case 'pjm':
        // Mock PJM data (real API requires authentication)
        apiData = {
          source: 'PJM Interconnection',
          timestamp: new Date().toISOString(),
          region: 'Pennsylvania',
          metrics: {
            current_load: '42,500 MW',
            peak_forecast: '48,200 MW',
            renewable_percent: '22%',
            grid_status: 'Normal',
            emissions_rate: '0.45 kg CO2/kWh'
          }
        };
        break;

      case 'nist':
        // Mock NIST quantum data
        apiData = {
          source: 'NIST',
          category: 'Post-Quantum Cryptography',
          standards: [
            { name: 'CRYSTALS-Kyber', type: 'Key Encapsulation', status: 'Standardized' },
            { name: 'CRYSTALS-Dilithium', type: 'Digital Signature', status: 'Standardized' },
            { name: 'FALCON', type: 'Digital Signature', status: 'Standardized' },
            { name: 'SPHINCS+', type: 'Digital Signature', status: 'Standardized' }
          ],
          last_updated: '2024-08-13'
        };
        break;

      default:
        throw new Error(`Unknown API source: ${source}`);
    }

    return new Response(JSON.stringify(apiData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Proxy error:", error);
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

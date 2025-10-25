import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, query, context } = await req.json();
    const apiKey = Deno.env.get('21ST_DEV_API_KEY');

    if (!apiKey) {
      throw new Error('21ST_DEV_API_KEY not configured');
    }

    console.log(`21st.dev Magic request - Action: ${action}, Query: ${query}`);

    // Call 21st.dev Magic API
    const response = await fetch('https://api.21st.dev/v1/magic', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: action || 'search',
        query,
        context: context || {},
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('21st.dev API error:', response.status, errorText);
      throw new Error(`21st.dev API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('21st.dev response received');

    return new Response(
      JSON.stringify({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in terminal-21st-magic:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
import { MOCK } from '../lib/mock';

// Environment variables for live APIs (will fallback to mock if not set)
const OS_KEY = process.env.VITE_OPENSTATES_KEY;
const PA_SODA_URL = process.env.VITE_PA_SODA_URL;

interface SearchParams {
  q: string;
  state?: string;
  fy?: string;
  limit?: number;
}

// Mock search function for tonight's demo
function searchMock(params: SearchParams) {
  const { q, fy, limit = 10 } = params;
  const query = q.toLowerCase();
  
  const score = (item: any) => {
    const text = JSON.stringify(item).toLowerCase();
    let s = 0;
    if (!query) return 0.5;
    
    // Simple text matching
    query.split(/\s+/).forEach(token => {
      if (text.includes(token)) s += 0.4;
    });
    
    return s;
  };

  const bills = MOCK.bills
    .map(x => ({ ...x, _score: score(x) }))
    .filter(x => x._score > 0.1)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  const budget_lines = MOCK.budget_lines
    .filter(x => !fy || x.fy === parseInt(fy))
    .map(x => ({ ...x, _score: score(x) }))
    .filter(x => x._score > 0.1)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  const projects = MOCK.projects
    .map(x => ({ ...x, _score: score(x) }))
    .filter(x => x._score > 0.1)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  const lobby = MOCK.lobby
    .map(x => ({ ...x, _score: score(x) }))
    .filter(x => x._score > 0.1)
    .sort((a, b) => b._score - a._score)
    .slice(0, limit);

  return {
    bills: bills.map(({ _score, ...rest }) => rest),
    budget_lines: budget_lines.map(({ _score, ...rest }) => rest),
    projects: projects.map(({ _score, ...rest }) => rest),
    lobby: lobby.map(({ _score, ...rest }) => rest),
    sources: ["mock_data"]
  };
}

// Live API integration functions (for when you're ready)
async function searchOpenStates(q: string, limit: number) {
  if (!OS_KEY) return [];
  
  try {
    const response = await fetch(
      `https://v3.openstates.org/bills?jurisdiction=Pennsylvania&q=${encodeURIComponent(q)}&per_page=${limit}`,
      { headers: { "X-API-KEY": OS_KEY } }
    );
    const data = await response.json();
    return (data.results || []).map((b: any) => ({
      id: b.id,
      title: b.title,
      subjects: b.subjects || b.classification || [],
      when: b.updated_at,
      summary: b.abstract || "",
      status: b.latest_action?.description || "unknown",
      jurisdiction: b.jurisdiction.name,
      source: "openstates"
    }));
  } catch (error) {
    console.error('OpenStates API error:', error);
    return [];
  }
}

async function searchUSASpending(q: string, state: string, limit: number) {
  try {
    const response = await fetch("https://api.usaspending.gov/api/v2/search/spending_by_award/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: ["Award ID", "Recipient Name", "Award Amount", "Action Date", "Awarding Agency", "Award Description"],
        filters: { 
          recipient_locations: [{ state }], 
          keywords: q ? [q] : [] 
        },
        page: 1,
        limit,
        sort: "-Award Amount"
      })
    });
    const data = await response.json();
    return (data.results || []).map((a: any) => ({
      id: a.internal_id || a.award_id,
      title: a.award_description || a.award_id,
      amount: a.award_amount,
      recipient: a.recipient_name,
      when: a.action_date,
      subjects: [],
      kind: "award",
      agency: a.awarding_agency,
      source: "usaspending"
    }));
  } catch (error) {
    console.error('USASpending API error:', error);
    return [];
  }
}

async function searchPASocrata(q: string, fy: string, limit: number) {
  if (!PA_SODA_URL) return [];
  
  try {
    const fyFilter = fy ? `fiscal_year=${fy} AND ` : "";
    const response = await fetch(
      `${PA_SODA_URL}?$select=program,fiscal_year,amount&$where=${fyFilter}program ILIKE '%25${encodeURIComponent(q)}%25'&$limit=${limit}`
    );
    const data = await response.json();
    return data.map((r: any) => ({
      id: `${r.program}-${r.fiscal_year}`,
      program: r.program,
      fy: Number(r.fiscal_year),
      amount: Number(r.amount),
      subjects: [],
      agency: "PA Government",
      state: "PA",
      source: "pa_socrata"
    }));
  } catch (error) {
    console.error('PA Socrata API error:', error);
    return [];
  }
}

export async function searchPolicyGraph(params: SearchParams) {
  const { q, state = "PA", fy, limit = 10 } = params;
  
  // For tonight's demo, use mock data
  // When ready for live APIs, uncomment the Promise.all below
  
  // Mock search
  if (!OS_KEY && !PA_SODA_URL) {
    return searchMock(params);
  }
  
  // Live API search
  try {
    const [bills, projects, budget_lines] = await Promise.all([
      searchOpenStates(q, limit),
      searchUSASpending(q, state, limit),
      searchPASocrata(q, fy || "", limit)
    ]);
    
    // Lobby data would come from parsed LDA files (not implemented tonight)
    const lobby: any[] = [];
    
    const sources = [];
    if (OS_KEY) sources.push("openstates");
    if (PA_SODA_URL) sources.push("pa_socrata");
    sources.push("usaspending");
    
    return {
      bills,
      budget_lines,
      projects,
      lobby,
      sources
    };
  } catch (error) {
    console.error('API search error, falling back to mock:', error);
    return searchMock(params);
  }
}
"use client";

import React, { useState, useCallback } from "react";
import { searchPolicyGraph } from "../api/search";
import { matchEntities, type MatchResult } from "../api/match";
import { explainMatch, type ExplanationResult } from "../api/explain";

/**
 * PrometheusXAI PolicyMarketplaceDemo.tsx
 * Enhanced version with live API integration and semantic matching
 */
export default function PolicyMarketplaceDemo() {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [data, setData] = useState<any>({ bills: [], budget_lines: [], projects: [], lobby: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<{ type: string; id: string; title: string } | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [explanation, setExplanation] = useState<ExplanationResult | null>(null);
  const [showMatches, setShowMatches] = useState(false);

  const searchData = useCallback(async (searchQuery: string, searchTags: string[]) => {
    if (!searchQuery.trim() && searchTags.length === 0) {
      setData({ bills: [], budget_lines: [], projects: [], lobby: [] });
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchPolicyGraph({
        q: searchQuery,
        state: "PA",
        fy: "2025",
        limit: 10
      });
      setData(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchData(query, tags);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, tags, searchData]);

  const toggleTag = (t: string) => setTags(prev => 
    prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
  );

  const handleEntityClick = async (type: string, id: string, title: string) => {
    setSelectedEntity({ type, id, title });
    setShowMatches(true);
    setExplanation(null);
    
    try {
      const entityMatches = await matchEntities(type as any, id, 5);
      setMatches(entityMatches);
    } catch (error) {
      console.error('Match failed:', error);
      setMatches([]);
    }
  };

  const handleExplainMatch = async (match: MatchResult) => {
    try {
      const explanation = await explainMatch(
        match.a_type, 
        match.a_id, 
        match.b_type, 
        match.b_id
      );
      setExplanation(explanation);
    } catch (error) {
      console.error('Explain failed:', error);
    }
  };

  const Tag = ({ name }: { name: string }) => (
    <button
      onClick={() => toggleTag(name)}
      className={`text-xs px-2 py-1 rounded-full border transition-colors ${
        tags.includes(name) 
          ? "bg-gray-900 text-white border-gray-900" 
          : "hover:bg-gray-100"
      }`}
    >
      {name}
    </button>
  );

  const MatchCard = ({ match }: { match: MatchResult }) => (
    <div className="border rounded-lg p-3 bg-blue-50">
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium">
          {match.b_type}: {match.b_id}
        </div>
        <div className="text-sm font-semibold text-blue-600">
          {(match.score * 100).toFixed(0)}%
        </div>
      </div>
      <div className="text-xs text-gray-600 mb-2">
        Embedding: {(match.features.embedding_cos * 100).toFixed(0)}% | 
        Topics: {(match.features.issue_overlap * 100).toFixed(0)}%
      </div>
      <button
        onClick={() => handleExplainMatch(match)}
        className="text-xs text-blue-600 hover:underline"
      >
        Explain this match
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold">
          PrometheusXAI — Policy Graph Explorer
        </h1>
        <button
          className="text-sm underline"
          onClick={() => {
            const rows = [["type","id","title_or_program","amount_or_quarter","subjects"]];
            data.bills?.forEach((x: any) => rows.push(["bill",x.id,x.title,"",x.subjects?.join("|") || ""]));
            data.budget_lines?.forEach((x: any) => rows.push(["budget",x.id,x.program,String(x.amount),x.subjects?.join("|") || ""]));
            data.projects?.forEach((x: any) => rows.push(["project",x.id,x.title,String(x.amount),x.subjects?.join("|") || ""]));
            data.lobby?.forEach((x: any) => rows.push(["lobby",x.id,x.client,x.quarter,(x.issues||[]).join("|")]));
            const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
            const blob = new Blob([csv], {type:"text/csv"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "policy-graph-export.csv"; a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Try: school transportation, clean energy, hospital cyber, rural broadband…"
          />
          <button 
            className="border rounded-lg px-3 py-2" 
            onClick={() => { setQuery(""); setTags([]); setShowMatches(false); }}
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag name="education"/>
          <Tag name="energy"/>
          <Tag name="health"/>
          <Tag name="cybersecurity"/>
          <Tag name="technology"/>
          <Tag name="rural"/>
        </div>
        {isLoading && (
          <div className="text-sm text-gray-500">🔍 Searching policy graph...</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Results */}
        <div className={`${showMatches ? 'lg:col-span-2' : 'lg:col-span-3'} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
          <Card title="Bills" count={data.bills?.length || 0}>
            <List items={data.bills?.map((x: any) => ({
              ...x,
              onClick: () => handleEntityClick("bill", x.id, x.title)
            })) || []} />
          </Card>
          
          <Card title="Budget Lines" count={data.budget_lines?.length || 0}>
            <List items={data.budget_lines?.map((x: any) => ({
              ...x,
              onClick: () => handleEntityClick("budget", x.id, x.program)
            })) || []} />
          </Card>
          
          <Card title="Projects/Grants" count={data.projects?.length || 0}>
            <List items={data.projects?.map((x: any) => ({
              ...x,
              onClick: () => handleEntityClick("project", x.id, x.title)
            })) || []} />
          </Card>
          
          <Card title="Lobby Filings" count={data.lobby?.length || 0}>
            <List items={data.lobby?.map((x: any) => ({
              ...x,
              onClick: () => handleEntityClick("lobby", x.id, x.client)
            })) || []} />
          </Card>
        </div>

        {/* Matches Sidebar */}
        {showMatches && (
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Entity Matches</h3>
              <button 
                onClick={() => setShowMatches(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {selectedEntity && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm">{selectedEntity.type}</div>
                <div className="text-xs text-gray-600">{selectedEntity.title}</div>
              </div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {matches.map((match, i) => (
                <MatchCard key={i} match={match} />
              ))}
              {matches.length === 0 && selectedEntity && (
                <div className="text-sm text-gray-500">No matches found</div>
              )}
            </div>

            {explanation && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-sm mb-2">Match Explanation</h4>
                <div className="text-xs space-y-1">
                  {explanation.explain.map((line, i) => (
                    <div key={i} className="text-gray-700">{line}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Powered by local embeddings (Transformers.js) + live APIs. 
        Sources: {data.sources?.join(", ") || "mock data"}
      </p>
    </div>
  );
}

function Card({ title, children, count }: { title: string; children: React.ReactNode; count?: number }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">
        {title} {count !== undefined && <span className="text-sm text-gray-500">({count})</span>}
      </h2>
      {children}
    </div>
  );
}

function List({ items }: { items: any[] }) {
  const EntityCard = ({ item, onClick }: { item: any; onClick: () => void }) => (
    <li 
      className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="font-medium">{item.title || item.program || item.client}</div>
      <div className="text-xs text-gray-600">
        {item.summary || item.recipient || `Issues: ${item.issues?.join(", ") || ""}`}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {item.amount ? `$${item.amount.toLocaleString()}` : 
         item.fy ? `FY ${item.fy}` : 
         item.quarter || item.when || ""}
      </div>
      <div className="text-xs text-blue-600 mt-1">
        Click to find matches →
      </div>
    </li>
  );

  return (
    <ul className="space-y-2 text-sm">
      {items.length === 0 ? (
        <li className="text-gray-500 italic">No results</li>
      ) : (
        items.map((item, i) => (
          <EntityCard 
            key={item.id || i} 
            item={item} 
            onClick={item.onClick || (() => {})}
          />
        ))
      )}
    </ul>
  );
}
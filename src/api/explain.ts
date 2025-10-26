import type { Kind } from '../lib/mock';
import { findEntity } from '../lib/mock';
import { embed, cosine, jaccard } from '../lib/embed';

// Same helper functions as match.ts
function textOf(k: Kind, it: any): string {
  if (k === "bill") {
    return `${it.title} ${it.summary || ""} ${it.subjects?.join(" ") || ""}`;
  }
  if (k === "budget") {
    return `${it.program} FY ${it.fy} ${it.subjects?.join(" ") || ""} ${it.agency || ""}`;
  }
  if (k === "project") {
    return `${it.title} ${it.recipient || ""} ${it.subjects?.join(" ") || ""} ${it.agency || ""}`;
  }
  return `${it.client} ${it.issues?.join(" ") || ""} ${it.mentions?.join(" ") || ""} ${it.registrant || ""}`;
}

function topicsOf(k: Kind, it: any): string[] {
  return (k === "lobby") ? (it.issues || []) : (it.subjects || []);
}

function geoOverlap(k1: Kind, it1: any, k2: Kind, it2: any): number {
  const state1 = (k1 === "budget") ? it1.state : 
                 (k1 === "bill") ? "PA" : 
                 (k1 === "project" && it1.recipient_geo?.state) ? it1.recipient_geo.state : null;
  
  const state2 = (k2 === "budget") ? it2.state : 
                 (k2 === "bill") ? "PA" :
                 (k2 === "project" && it2.recipient_geo?.state) ? it2.recipient_geo.state : null;
  
  if (state1 && state2 && state1 === state2) return 1.0;
  if (state1 && state2) return 0.0;
  return 0.5;
}

function timeProximityDays(k1: Kind, it1: any, k2: Kind, it2: any): number | null {
  const date1 = (k1 === "bill") ? it1.when :
                (k1 === "project") ? it1.when :
                (k1 === "budget") ? `${it1.fy}-01-01` : null;
  
  const date2 = (k2 === "bill") ? it2.when :
                (k2 === "project") ? it2.when :
                (k2 === "budget") ? `${it2.fy}-01-01` : null;
  
  if (!date1 || !date2) return null;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.abs(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
}

function titleOf(k: Kind, it: any): string {
  if (k === "bill" || k === "project") {
    return it.title || it.id;
  }
  if (k === "budget") {
    return it.program || it.id;
  }
  return it.client || it.id;
}

export interface ExplanationResult {
  a: { type: Kind; id: string; title: string };
  b: { type: Kind; id: string; title: string };
  score: number;
  weights: {
    embedding: number;
    issue: number;
    geo: number;
    time: number;
    keywords: number;
  };
  features: {
    embedding_cos: number;
    issue_overlap: number;
    geo_overlap: number | null;
    time_proximity_days: number | null;
    keywords_overlap: number | null;
  };
  explain: string[];
}

export async function explainMatch(
  a_type: Kind, 
  a_id: string, 
  b_type: Kind, 
  b_id: string
): Promise<ExplanationResult | null> {
  const A = findEntity(a_type, a_id);
  const B = findEntity(b_type, b_id);
  
  if (!A || !B) return null;

  const [aVec, bVec] = await Promise.all([
    embed(textOf(a_type, A)), 
    embed(textOf(b_type, B))
  ]);

  const embedding_cos = cosine(aVec, bVec);
  const issue_overlap = jaccard(topicsOf(a_type, A), topicsOf(b_type, B));
  const geo_overlap = geoOverlap(a_type, A, b_type, B);
  const time_proximity_days = timeProximityDays(a_type, A, b_type, B);
  
  // Keywords overlap
  const aWords = new Set(textOf(a_type, A).toLowerCase().split(/\s+/));
  const bWords = new Set(textOf(b_type, B).toLowerCase().split(/\s+/));
  const keywords_overlap = jaccard([...aWords], [...bWords]);

  // Calculate score
  const weights = {
    embedding: 0.35,
    issue: 0.2,
    geo: 0.2,
    time: 0.15,
    keywords: 0.1
  };

  let score = weights.embedding * embedding_cos + weights.issue * issue_overlap;
  
  if (geo_overlap !== null) score += weights.geo * geo_overlap;
  if (time_proximity_days !== null) {
    const timeScore = Math.max(0, 1 - time_proximity_days / 365);
    score += weights.time * timeScore;
  }
  if (keywords_overlap !== null) score += weights.keywords * keywords_overlap;

  // Generate human-readable explanations
  const explain: string[] = [];
  
  explain.push(
    `Semantic similarity: ${(embedding_cos * 100).toFixed(1)}% (weight: ${weights.embedding * 100}%)`
  );
  
  if (issue_overlap > 0) {
    const commonTopics = topicsOf(a_type, A).filter(t => topicsOf(b_type, B).includes(t));
    explain.push(
      `Topic overlap: ${(issue_overlap * 100).toFixed(1)}% - shared topics: ${commonTopics.join(", ") || "none"} (weight: ${weights.issue * 100}%)`
    );
  } else {
    explain.push(`No shared topic categories (weight: ${weights.issue * 100}%)`);
  }

  if (geo_overlap !== null) {
    const geoDesc = geo_overlap === 1.0 ? "same location" : 
                   geo_overlap === 0.0 ? "different locations" : "unknown location";
    explain.push(`Geographic: ${geoDesc} (weight: ${weights.geo * 100}%)`);
  }

  if (time_proximity_days !== null) {
    const timeScore = Math.max(0, 1 - time_proximity_days / 365);
    explain.push(
      `Time proximity: ${Math.round(time_proximity_days)} days apart, score: ${(timeScore * 100).toFixed(1)}% (weight: ${weights.time * 100}%)`
    );
  }

  if (keywords_overlap !== null && keywords_overlap > 0) {
    explain.push(
      `Keyword overlap: ${(keywords_overlap * 100).toFixed(1)}% of words in common (weight: ${weights.keywords * 100}%)`
    );
  }

  explain.push(`Final match score: ${(score * 100).toFixed(1)}%`);

  return {
    a: { 
      type: a_type, 
      id: a_id, 
      title: titleOf(a_type, A)
    },
    b: { 
      type: b_type, 
      id: b_id, 
      title: titleOf(b_type, B)
    },
    score,
    weights,
    features: {
      embedding_cos,
      issue_overlap,
      geo_overlap,
      time_proximity_days,
      keywords_overlap
    },
    explain
  };
}
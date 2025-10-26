import { kindArray, findEntity } from '../lib/mock';
import type { Kind } from '../lib/mock';
import { embed, cosine, jaccard } from '../lib/embed';

// Map an item to a text string for embedding
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
  // lobby
  return `${it.client} ${it.issues?.join(" ") || ""} ${it.mentions?.join(" ") || ""} ${it.registrant || ""}`;
}

// Extract "issues/subjects" list for topic overlap
function topicsOf(k: Kind, it: any): string[] {
  return (k === "lobby") ? (it.issues || []) : (it.subjects || []);
}

// Calculate geographic overlap (placeholder for now)
function geoOverlap(k1: Kind, it1: any, k2: Kind, it2: any): number {
  // Simple state matching for now
  const state1 = (k1 === "budget") ? it1.state : 
                 (k1 === "bill") ? "PA" : // assume PA bills
                 (k1 === "project" && it1.recipient_geo?.state) ? it1.recipient_geo.state : null;
  
  const state2 = (k2 === "budget") ? it2.state : 
                 (k2 === "bill") ? "PA" :
                 (k2 === "project" && it2.recipient_geo?.state) ? it2.recipient_geo.state : null;
  
  if (state1 && state2 && state1 === state2) return 1.0;
  if (state1 && state2) return 0.0; // different states
  return 0.5; // unknown
}

// Calculate time proximity (placeholder)
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

export interface MatchResult {
  a_type: Kind;
  a_id: string;
  b_type: Kind;
  b_id: string;
  score: number;
  features: {
    embedding_cos: number;
    issue_overlap: number;
    geo_overlap: number | null;
    time_proximity_days: number | null;
    keywords_overlap: number | null;
  };
}

export async function matchEntities(a_type: Kind, a_id: string, limit: number = 10): Promise<MatchResult[]> {
  const A = findEntity(a_type, a_id);
  if (!A) return [];

  const aVec = await embed(textOf(a_type, A));
  const kinds: Kind[] = ["bill", "budget", "project", "lobby"];
  const results: MatchResult[] = [];

  for (const k of kinds) {
    for (const B of kindArray(k)) {
      if (k === a_type && B.id === a_id) continue; // skip self

      const bVec = await embed(textOf(k, B));
      const embedding_cos = cosine(aVec, bVec);
      const issue_overlap = jaccard(topicsOf(a_type, A), topicsOf(k, B));
      const geo_overlap = geoOverlap(a_type, A, k, B);
      const time_proximity_days = timeProximityDays(a_type, A, k, B);
      
      // Keywords overlap (simple word intersection for now)
      const aWords = new Set(textOf(a_type, A).toLowerCase().split(/\s+/));
      const bWords = new Set(textOf(k, B).toLowerCase().split(/\s+/));
      const keywords_overlap = jaccard([...aWords], [...bWords]);

      // Scoring weights: embedding(35%) + issue(20%) + geo(20%) + time(15%) + keywords(10%)
      let score = 0.35 * embedding_cos + 0.2 * issue_overlap;
      
      if (geo_overlap !== null) score += 0.2 * geo_overlap;
      if (time_proximity_days !== null) {
        // Convert days to proximity score (closer = higher score)
        const timeScore = Math.max(0, 1 - time_proximity_days / 365); // 1 year = 0 score
        score += 0.15 * timeScore;
      }
      if (keywords_overlap !== null) score += 0.1 * keywords_overlap;

      results.push({
        a_type,
        a_id,
        b_type: k,
        b_id: B.id,
        score,
        features: {
          embedding_cos,
          issue_overlap,
          geo_overlap,
          time_proximity_days,
          keywords_overlap
        }
      });
    }
  }

  // Sort by score (highest first) and return top matches
  results.sort((x, y) => y.score - x.score);
  return results.slice(0, limit);
}
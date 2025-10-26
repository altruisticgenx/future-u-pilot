# PrometheusXAI Policy Graph Explorer 🔥

A complete full-stack demo that combines:
- **Policy Graph API** (Bills ↔ Budgets ↔ Projects ↔ Lobbying)
- **Local AI embeddings** (Transformers.js) for semantic matching
- **Explainable AI** with feature weights and reasoning
- **Custom GPT integration** via OpenAPI Actions

## 🚀 Quick Start (Tonight's Demo)

```bash
# 1. Install and run
npm install
npm run dev

# 2. Open browser to localhost:5173
# 3. Click "Test APIs" to verify everything works
# 4. Try searches like "school transportation" or "clean energy"
# 5. Click any item to see semantic matches
# 6. Click "Explain this match" to see AI reasoning
```

## 🧠 What's Working

### ✅ Frontend (React + Vite)
- **PolicyMarketplaceDemoEnhanced**: 4-box UI with semantic matching
- **PrometheusDemo**: Full demo page with API testing
- **Real-time search** with debouncing
- **Entity matching** with explanation tooltips
- **CSV export** functionality

### ✅ Backend APIs (Client-side for now)
- **Search API** (`/api/search`): Cross-searches bills, budgets, projects, lobby
- **Match API** (`/api/match`): Semantic similarity using local embeddings
- **Explain API** (`/api/explain`): Feature weights + human-readable reasoning

### ✅ AI/ML Core
- **Transformers.js**: Local embeddings (Xenova/all-MiniLM-L6-v2)
- **Cosine similarity**: Semantic text matching
- **Multi-feature scoring**: embedding + topics + geo + time + keywords
- **Explainable features**: Shows why entities match

### ✅ Data Layer
- **Enhanced mock data**: 4 categories with realistic Pennsylvania examples
- **Live API integration**: Ready for Open States, USAspending, PA Socrata
- **Fallback logic**: Uses mock when APIs unavailable

## 🤖 Custom GPT Setup

See `/docs/PrometheusXAI-CustomGPT-Config.md` for complete instructions.

**Quick version:**
1. Go to ChatGPT → Create → GPT
2. Copy the Name, Description, Instructions from the config file
3. Import the OpenAPI schema under Actions
4. Replace `YOUR_DOMAIN_HERE` with your deployment URL
5. Test with: "Show me school transportation in PA FY2025"

## 📊 Data Sources (Ready to Enable)

### Tonight: Mock Data
High-quality sample data covering education, energy, health, cybersecurity, rural tech.

### Tomorrow: Live APIs
- **Open States v3**: Bills, people, votes (requires free API key)
- **USAspending**: Federal awards/contracts (no key required)
- **PA Socrata**: State budget lines (no key required)
- **Senate LDA**: Lobbying registrations (bulk download + parse)

## 🔬 Semantic Matching Features

### Scoring Algorithm
```
score = 0.35×embedding + 0.20×topics + 0.20×geo + 0.15×time + 0.10×keywords
```

### Features Explained
- **Embedding**: Semantic similarity via Transformers.js (384-dim vectors)
- **Topics**: Jaccard overlap of subjects/issues arrays
- **Geographic**: State-level matching (PA focus)
- **Temporal**: Date proximity scoring (bills ↔ projects ↔ budgets)
- **Keywords**: Simple word intersection

### Explainability
Every match includes:
- Individual feature scores
- Feature weights used
- Human-readable explanations
- Final confidence score

## 🛠 Technical Architecture

```
Frontend (React/Vite)
├── PolicyMarketplaceDemoEnhanced.tsx (main UI)
├── PrometheusDemo.tsx (demo page)
└── api/
    ├── search.ts (unified search)
    ├── match.ts (semantic matching)
    └── explain.ts (explainable AI)

AI/ML Layer
├── lib/embed.ts (Transformers.js)
├── lib/mock.ts (sample data)
└── Xenova/all-MiniLM-L6-v2 (local model)

Integration Layer
├── OpenAPI schema (Custom GPT Actions)
├── Environment variables (API keys)
└── Live API connectors (ready to enable)
```

## 🌐 Deployment Options

### Option A: Vercel (Recommended)
```bash
git push origin main
# Connect to Vercel dashboard
# Set environment variables for API keys
```

### Option B: Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Option C: GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 🔑 Environment Variables (For Live APIs)

Create `.env.local`:
```bash
VITE_OPENSTATES_KEY=your_key_here        # docs.openstates.org
VITE_PA_SODA_URL=https://data.pa.gov/resource/xxxx.json
```

## 🎯 Demo Scenarios

### 1. Cross-Entity Discovery
- Search: "school transportation"
- Find: Bill HB-101 + Budget B-EDU-25 + Project P-001 + Lobby L-001
- Match: 87% semantic similarity between bill and budget line

### 2. Semantic Exploration
- Click: "District 12 Electric Buses" project
- Discover: Matches education bills (school buses) AND energy bills (electric)
- Explain: 72% embedding similarity + 60% topic overlap

### 3. Policy Impact Analysis
- Search: "rural broadband"
- Connect: Bill HB-405 + Budget B-TECH-25 + Project P-004 + Lobby L-004
- Export: CSV for further analysis

## 🔥 PrometheusXAI Philosophy

**Truth over Convenience**: Shows uncertainty, cites sources, requests validation
**Transparent AI**: Explainable features, confidence scores, methodology disclosure
**Ethical First**: Refuses harmful requests, suggests constructive alternatives
**Human-in-Loop**: Defers to human judgment, proposes verification steps

## 📈 Next Steps

### Week 1: Live Data
- [ ] Enable Open States API (PA bills)
- [ ] Enable USAspending API (federal awards)
- [ ] Enable PA Socrata API (budget lines)
- [ ] Parse Senate LDA XML (lobbying)

### Week 2: Production
- [ ] Deploy to production URL
- [ ] Update Custom GPT with live endpoint
- [ ] Add authentication/rate limiting
- [ ] Monitor API usage

### Week 3: Enhancement
- [ ] Add more states beyond PA
- [ ] Improve geo/time matching
- [ ] Add trend analysis over time
- [ ] Build provider marketplace

## 🎪 Live Demo

Try these searches to see the AI in action:
- "school transportation" → cross-entity matches
- "clean energy" → bills + budgets + grants
- "hospital cyber" → security funding flows
- "rural broadband" → infrastructure connections

Click any result → see semantic matches → click "explain" → see AI reasoning!

---

**Built with:** React + Vite + TypeScript + Tailwind + Transformers.js + OpenAPI Actions

**Ready for:** Open States + USAspending + PA Socrata + Senate LDA + Custom GPT

🔥 *"Like Prometheus bringing fire to humanity, we bring the illumination of connected policy data."*
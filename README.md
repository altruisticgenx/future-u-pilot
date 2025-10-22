# AI Consulting Site — AltruisticXAI

Quantum-AI Readiness Platform marketing site with interactive dashboards.

**Stack:** React, Vite, TypeScript, Tailwind CSS, shadcn UI, Lovable Cloud (Supabase)

## What's Included

### Marketing Pages
- Hero section with gradient accents
- Service cards showcasing AI/Quantum consulting
- Why It Matters & Why Now sections
- Living Lab Notes (experiments feed)
- Contact form with Formspree/backend integration ready
- Logo row for credibility

### Dashboard Features
- **Policy Dashboard** (`/policy-dashboard`): Regulatory timeline, alerts panel, trend analysis, entity tag cloud
- **FedRAMP Sandbox** (`/fedramp-sandbox`): Isolated environments, RBAC gating, audit log
- **PQC Module** (`/pqc-module`): Migration checklist, NIST algorithm mapping, downloadable resources
- **Demo** (`/demo`): Generate Report modal with evidence trace
- **Experiments** (`/experiments`): Lab notes feed

## Quick Start

### Development
```sh
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

### Deploy
Click **Publish** in Lovable or connect to Vercel/Netlify via GitHub integration.

### Connect Custom Domain
Navigate to Project > Settings > Domains in Lovable.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS with semantic design tokens, shadcn UI components
- **Backend**: Lovable Cloud (Supabase) for auth, database, storage, edge functions
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn UI primitives
│   ├── Hero.tsx
│   ├── ServiceCards.tsx
│   ├── ContactForm.tsx
│   └── ...
├── pages/              # Route pages
│   ├── Index.tsx       # Landing page
│   ├── PolicyDashboard.tsx
│   ├── FedRAMPSandbox.tsx
│   ├── PQCModule.tsx
│   └── ...
├── integrations/       # Supabase client (auto-generated)
└── index.css           # Design system tokens
```

## Design System

All colors use HSL semantic tokens from `index.css`:
- `--primary`, `--secondary`, `--accent` for brand colors
- `--background`, `--foreground` for base colors
- Gradient utilities for hero sections

## Environment Variables

Lovable Cloud auto-manages these:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Deployment & Hosting

**Recommended Setup:**
- Frontend: Vercel (auto-deploy via GitHub)
- Backend: Lovable Cloud (included)
- Analytics: PostHog / Plausible / GA4
- SSO (future): Okta, Azure AD, Google Workspace

## Editing the Code

### In Lovable
Visit [Lovable Project](https://lovable.dev/projects/a204118a-0418-4ec4-9f03-e883e54010a8) and prompt changes.

### Locally
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

### GitHub Codespaces
Create a Codespace from the repo and edit directly in the browser.

## Roadmap

- [ ] Wire contact form to Lovable Cloud database
- [ ] Add user authentication for dashboards
- [ ] Implement real-time Policy Dashboard data ingestion
- [ ] FedRAMP Sandbox RBAC enforcement
- [ ] PQC checklist PDF generation
- [ ] Blog/case studies with MDX
- [ ] CMS integration (Sanity/Contentful)

## License

Private / Proprietary (update as needed)

# ITMEAS

**Intelligent Trend Monitoring & Economic Analysis System**  
Created by **Aduba Joseph Elaigwu**

ITMEAS is a dark-first intelligence workspace for monitoring social/trend signals, economic indicators, AI interpretations, alerts, and personal watchlists. It is built to show the difference between a recorded fact, a signal, an AI interpretation, a prediction, and uncertainty.

## Included

- Responsive landing site plus email/password authentication and password-reset flows.
- Dashboard with KPI cards, trend momentum, economic pulse, alerts, source status, global search and mobile navigation.
- Trend monitoring with filter chips, transparent modular scoring, rankings, confidence, history and sentiment.
- Economic intelligence with normalized country/indicator-ready data and charting.
- AI insights and prediction surfaces that explicitly label demo data, interpretation, confidence, probability and uncertainty.
- Alerts, watchlist, historical analytics, data-source operations, settings and administrator overview.
- Separate Node/Express REST boundary with validation, CORS, Helmet headers, consistent envelopes, health route and safe errors.
- Supabase migration with normalized tables, indexes, role-aware RLS, auth-profile trigger and ownership controls.
- Functional, visibly labelled demo mode when live credentials are not configured.

## Architecture

```text
React + Vite client ──> REST API boundary ──> provider interfaces / OpenAI (server only)
       │                         │
       └──── Supabase Auth ──────┴──── PostgreSQL + RLS
```

The client uses React Router and TanStack Query. Chart rendering uses Recharts. The API is deliberately separated from provider-specific logic so trend, news, market and approved social providers can be added without coupling the UI to one vendor.

## Quick start

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

The frontend starts on `http://localhost:5173` in demo mode. In a second terminal:

```bash
npm run dev:api
```

The API starts on `http://localhost:8787`; health check: `http://localhost:8787/api/health`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_DEMO_MODE` / `DEMO_MODE` | Set to `true` for simulated, labelled data. Set to `false` only after providers are configured. |
| `VITE_API_BASE_URL` | Public URL of the Node API. |
| `VITE_SUPABASE_URL` | Supabase project URL, safe for browser use. |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable/anon key, safe only with RLS enabled. |
| `SUPABASE_URL` | Server-side Supabase URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only ingestion/admin secret. Never expose it to Vite. |
| `OPENAI_API_KEY` | Server-only OpenAI credential for production AI analysis. |
| `OPENAI_MODEL` | Explicit server-side model name. |
| `CORS_ORIGIN` | Browser origin allowed by the Node API. |
| `API_PORT` | Node API port, default `8787`. |

## Supabase setup

1. Create a Supabase project and enable Email auth.
2. Put the project URL and publishable/anon key in the two `VITE_` variables.
3. Apply `supabase/migrations/202609040001_initial_itmeas.sql` through the Supabase CLI or SQL editor.
4. Keep the service-role key server-side only.
5. Assign admin/analyst roles through a trusted server/admin workflow, never from browser input.

The migration enables RLS on all exposed tables. User-owned watchlists, notifications, settings, profiles and private alerts are protected by ownership policies. System datasets are readable to authenticated users while ingestion writes belong to trusted server roles.

## Provider and AI design

Demo mode is intentionally honest: source cards, charts and AI cards identify simulated content. Live providers should be implemented behind the provider interfaces and API boundary with caching, quotas/backoff, provider timestamps and persisted raw evidence. OpenAI calls stay in the Node layer. The included trend score is a transparent heuristic designed to be replaceable by a trained forecasting model.

## Verification

```bash
npm test
npm run lint
npm run typecheck:server
npm run build
```

## Deployment

- Deploy the Vite `dist/` output to Vercel, Netlify or another static host with SPA fallback to `index.html`.
- Deploy `server/index.ts` as a Node service, or split the routes into serverless functions. Set production environment variables on the server only.
- Apply the Supabase migration before enabling non-demo mode.
- Schedule provider ingestion according to source frequency: frequent for trend signals, slower for macroeconomic series and event-driven for AI insight generation.

## Current limitations

No external data-source credentials are bundled. Demo mode is the safe default. Supabase and live providers become active only after their environment variables and provider implementations are configured. This repository is therefore a production-oriented application baseline, not a claim that live third-party feeds are already connected.

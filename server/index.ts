import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { z } from 'zod'
import { alerts, indicators, insights, predictions, sources, trends } from '../src/data/demo'
import { analysisProvider } from './ai'
const app = express()
const port = Number(process.env.API_PORT ?? 8787)
const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173'
const demoMode = process.env.DEMO_MODE !== 'false'
app.use(helmet()); app.use(cors({ origin: allowedOrigin })); app.use(express.json({ limit: '32kb' }))
const respond = <T>(data: T) => ({ data, meta: { mode: demoMode ? 'demo' : 'live', generatedAt: new Date().toISOString() } })
app.get('/api/health', (_req, res) => res.json({ status: 'ok', mode: demoMode ? 'demo' : 'live' }))
app.get('/api/trends', (_req, res) => res.json(respond(trends)))
app.get('/api/trends/:id', (req, res) => { const item = trends.find((trend) => trend.id === req.params.id); if (!item) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Trend not found.' } }); return res.json(respond(item)) })
app.get('/api/economy', (_req, res) => res.json(respond(indicators)))
app.get('/api/economy/:indicator', (req, res) => res.json(respond(indicators.filter((item) => item.id === req.params.indicator || item.name.toLowerCase() === req.params.indicator.toLowerCase()))))
app.get('/api/insights', (_req, res) => res.json(respond(insights)))
app.post('/api/insights/analyse', async (req, res, next) => { const parsed = z.object({ title: z.string().trim().min(2).max(140), facts: z.array(z.string().trim().min(1).max(600)).min(1).max(12), signals: z.array(z.string().trim().min(1).max(600)).min(1).max(12) }).safeParse(req.body); if (!parsed.success) return res.status(400).json({ error: { code: 'INVALID_ANALYSIS_INPUT', message: 'Provide a title, at least one fact, and at least one signal.' } }); try { return res.status(201).json(respond(await analysisProvider.analyse(parsed.data))) } catch (error) { return next(error) } })
app.get('/api/predictions', (_req, res) => res.json(respond(predictions)))
app.get('/api/alerts', (_req, res) => res.json(respond(alerts)))
app.get('/api/watchlists', (_req, res) => res.json(respond([])))
app.get('/api/data-sources', (_req, res) => res.json(respond(sources)))
app.get('/api/search', (req, res) => { const parsed = z.object({ q: z.string().trim().min(2).max(80) }).safeParse(req.query); if (!parsed.success) return res.status(400).json({ error: { code: 'INVALID_QUERY', message: 'Query must contain 2–80 characters.' } }); const q = parsed.data.q.toLowerCase(); return res.json(respond({ trends: trends.filter((item) => `${item.title} ${item.category} ${item.country}`.toLowerCase().includes(q)), indicators: indicators.filter((item) => `${item.name} ${item.country}`.toLowerCase().includes(q)), insights: insights.filter((item) => item.title.toLowerCase().includes(q)), alerts: alerts.filter((item) => item.title.toLowerCase().includes(q)) })) })
app.use((_req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'API route not found.' } }))
app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => { void next; console.error('API error', error); res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'The service could not process this request.' } }) })
app.listen(port, () => console.log(`ITMEAS API listening on ${port} (${demoMode ? 'demo' : 'live'} mode)`))

import { alerts, indicators, insights, predictions, sources, trends } from '../data/demo'
import type { ApiResponse } from '../types'
const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined
const demoResponse = <T,>(data: T): ApiResponse<T> => ({ data, meta: { mode: 'demo', generatedAt: new Date().toISOString() } })
async function request<T>(path: string, fallback: T): Promise<ApiResponse<T>> { if (!baseUrl || import.meta.env.VITE_DEMO_MODE !== 'false') return demoResponse(fallback); const response = await fetch(`${baseUrl}${path}`, { headers: { Accept: 'application/json' } }); if (!response.ok) throw new Error('ITMEAS data service is temporarily unavailable.'); return response.json() as Promise<ApiResponse<T>> }
export const api = {
  trends: () => request('/trends', trends), economy: () => request('/economy', indicators), insights: () => request('/insights', insights), predictions: () => request('/predictions', predictions), alerts: () => request('/alerts', alerts), sources: () => request('/data-sources', sources),
  search: (query: string) => request(`/search?q=${encodeURIComponent(query)}`, { trends: trends.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())), indicators: indicators.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.country.toLowerCase().includes(query.toLowerCase())) }),
}

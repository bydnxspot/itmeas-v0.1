export type Sentiment = 'Positive' | 'Neutral' | 'Negative'
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type SourceStatus = 'CONNECTED' | 'DEGRADED' | 'DISCONNECTED' | 'DEMO'
export interface Trend { id: string; title: string; keyword: string; category: string; source: string; region: string; country: string; popularity: number; previousPopularity: number; change: number; velocity: number; sentiment: Sentiment; confidence: number; score: number; updatedAt: string; history: { label: string; value: number }[] }
export interface EconomicPoint { date: string; value: number; country: string; indicator: string }
export interface Indicator { id: string; name: string; country: string; value: string; change: number; unit: string; sentiment: Sentiment; history: EconomicPoint[] }
export interface Alert { id: string; title: string; description: string; type: string; severity: Severity; relatedTo: string; recommendedAction: string; read: boolean; timestamp: string }
export interface Insight { id: string; title: string; summary: string; fact: string; signal: string; interpretation: string; risk: Severity; opportunity: Severity; confidence: number; updatedAt: string }
export interface Prediction { id: string; prediction: string; probability: number; timeframe: string; signals: string[]; uncertainty: string; timestamp: string }
export interface DataSource { id: string; name: string; type: string; status: SourceStatus; lastUpdated: string; message: string }
export interface ApiResponse<T> { data: T; meta: { mode: 'demo' | 'live'; generatedAt: string } }

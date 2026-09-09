import { indicators, trends } from '../src/data/demo'
import type { Indicator, Trend } from '../src/types'
export interface TrendProvider { readonly name: string; getTrends(input: { country?: string; category?: string; from?: Date }): Promise<Trend[]> }
export interface EconomicProvider { readonly name: string; getIndicators(input: { country?: string; indicator?: string; from?: Date }): Promise<Indicator[]> }
export interface NewsProvider { readonly name: string; search(input: { query: string; limit: number }): Promise<{ title: string; url: string; publishedAt: string }[]> }
export interface MarketProvider { readonly name: string; getQuote(symbol: string): Promise<{ symbol: string; price: number; capturedAt: string }> }
export const demoTrendProvider: TrendProvider = { name: 'Demo trend aggregation', async getTrends() { return trends } }
export const demoEconomicProvider: EconomicProvider = { name: 'Demo economic series', async getIndicators() { return indicators } }

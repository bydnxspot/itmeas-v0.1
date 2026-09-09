export interface TrendSignals { popularity: number; growth: number; acceleration: number; engagement: number; sourceCount: number; sentimentSignificance: number }
export function calculateTrendScore(signals: TrendSignals): number {
  const normalised = Math.min(100, signals.popularity / 1000) * 0.24 + Math.min(100, Math.max(0, signals.growth)) * 0.22 + Math.min(100, Math.max(0, signals.acceleration)) * 0.16 + Math.min(100, signals.engagement / 1000) * 0.18 + Math.min(100, signals.sourceCount * 20) * 0.1 + Math.min(100, signals.sentimentSignificance) * 0.1
  return Math.round(Math.min(100, normalised) * 10) / 10
}
export function alertCrossedThreshold(previous: number, current: number, threshold: number, direction: 'above' | 'below'): boolean { return direction === 'above' ? previous < threshold && current >= threshold : previous > threshold && current <= threshold }

import { describe, expect, it } from 'vitest'
import { alertCrossedThreshold, calculateTrendScore } from './trendScore'
describe('trend scoring', () => {
  it('produces a bounded, higher score for a stronger signal', () => {
    const low = calculateTrendScore({ popularity: 100, growth: 2, acceleration: 2, engagement: 60, sourceCount: 1, sentimentSignificance: 5 })
    const high = calculateTrendScore({ popularity: 100000, growth: 90, acceleration: 90, engagement: 90000, sourceCount: 8, sentimentSignificance: 100 })
    expect(low).toBeLessThan(high); expect(high).toBeLessThanOrEqual(100)
  })
  it('only fires an above alert when crossing into the threshold', () => expect(alertCrossedThreshold(70, 82, 80, 'above')).toBe(true))
})

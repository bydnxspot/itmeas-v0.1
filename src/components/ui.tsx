import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react'
import { AlertTriangle, ArrowDownRight, ArrowUpRight, Database, Sparkles } from 'lucide-react'
import type { Severity, Sentiment } from '../types'
export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) { return <section className={`card ${className}`}>{children}</section> }
export function Button({ children, className = '', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) { return <button className={`button ${className}`} {...props}>{children}</button> }
export function Badge({ children, tone = 'neutral' }: PropsWithChildren<{ tone?: 'neutral' | 'good' | 'warn' | 'danger' | 'info' }>) { return <span className={`badge badge-${tone}`}>{children}</span> }
export function DemoBanner() { return <div className="demo-banner"><Database size={15} /> <strong>Demo mode</strong><span>Simulated data is shown. Connect providers to use live signals.</span></div> }
export function Metric({ label, value, change, icon }: { label: string; value: string; change?: number; icon: ReactNode }) { const up = (change ?? 0) >= 0; return <Card className="metric"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{value}</strong>{change !== undefined && <small className={up ? 'positive' : 'negative'}>{up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{Math.abs(change)}% <i>vs previous period</i></small>}</Card> }
export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) { return <Badge tone={sentiment === 'Positive' ? 'good' : sentiment === 'Negative' ? 'danger' : 'neutral'}>{sentiment}</Badge> }
export function SeverityBadge({ severity }: { severity: Severity }) { const tone = severity === 'CRITICAL' || severity === 'HIGH' ? 'danger' : severity === 'MEDIUM' ? 'warn' : 'info'; return <Badge tone={tone}>{severity}</Badge> }
export function EmptyState({ title, copy }: { title: string; copy: string }) { return <div className="empty"><Sparkles size={24} /><strong>{title}</strong><p>{copy}</p></div> }
export function ErrorState({ error }: { error: string }) { return <div className="error"><AlertTriangle size={20} /><div><strong>Unable to load this view</strong><p>{error}</p></div></div> }

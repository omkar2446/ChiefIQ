import React from 'react';
import { useAppStore } from '../store/store';
import {
  Activity, Target, Clock, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle2, ChevronRight, LayoutTemplate,
  Zap, Shield, BarChart3
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { dashboardData, isLoading } = useAppStore();

  if (isLoading || !dashboardData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-azure-500 border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500">Analyzing M365 signals…</p>
        </div>
      </div>
    );
  }

  const health = dashboardData.org_health_score ?? 72;
  const isHealthy = health > 80;
  const isWarning = health > 60 && health <= 80;
  const healthColor = isHealthy ? '#00E676' : isWarning ? '#FFB300' : '#FF4D6D';
  const healthGlow  = isHealthy ? 'rgba(0,230,118,0.4)' : isWarning ? 'rgba(255,179,0,0.4)' : 'rgba(255,77,109,0.4)';
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (circumference * health) / 100;

  const stats = [
    { label: 'Active Projects', value: dashboardData.active_projects ?? 5,  color: '#2899F5', icon: LayoutTemplate },
    { label: 'Critical Risks',  value: dashboardData.risks?.critical ?? 4,   color: '#FF4D6D', icon: Shield },
    { label: 'Pending Actions', value: 12,                                    color: '#FFB300', icon: Zap },
    { label: 'Decisions Made',  value: 28,                                    color: '#00E676', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto animate-fade-up">

      {/* ── Value Banner ── */}
      <div className="value-banner">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-base font-bold text-white mb-1">AI Chief of Staff for Microsoft 365</h1>
            <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
              ChiefIQ continuously analyzes your Outlook, Teams, SharePoint, and Planner signals to surface decisions, priorities, and risks — so you can lead with clarity.
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.2)', color: '#00E676' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse" />
            Live Analysis
          </div>
        </div>
      </div>

      {/* ── Stat Cards Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-4 group cursor-default">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{s.label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{ background: `${s.color}18`, boxShadow: `0 0 10px ${s.color}20` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
            </div>
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Row 2: Health + Recommendations ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Org Health Gauge */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${healthGlow.replace('0.4','0.07')} 0%, transparent 70%)` }} />
          <div className="section-header w-full mb-4">
            <div className="icon-wrap" style={{ background: `${healthColor}20` }}>
              <Activity className="w-4 h-4" style={{ color: healthColor }} />
            </div>
            <span>Org Health Score</span>
          </div>

          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none"
                stroke={healthColor} strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 8px ${healthGlow})`, transition: 'stroke-dashoffset 1s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: healthColor }}>{health}</span>
              <div className="flex items-center gap-1 text-xs font-medium mt-0.5"
                style={{ color: dashboardData.trend === 'up' ? '#00E676' : '#FF4D6D' }}>
                {dashboardData.trend === 'up'
                  ? <TrendingUp className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />}
                {dashboardData.trend === 'up' ? '+2.4%' : '-1.2%'}
              </div>
            </div>
          </div>

          {/* Mini stat bar */}
          <div className="w-full mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              { val: 2, label: 'On Track', c: '#00E676' },
              { val: 1, label: 'At Risk',  c: '#FFB300' },
              { val: 2, label: 'Critical', c: '#FF4D6D' },
            ].map(s => (
              <div key={s.label} className="glass-card py-2 px-1">
                <div className="font-bold text-lg" style={{ color: s.c }}>{s.val}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top AI Recommendations */}
        <div className="glass-panel p-6 col-span-2">
          <div className="section-header mb-5">
            <div className="icon-wrap" style={{ background: 'rgba(255,179,0,0.15)' }}>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <span>Top AI Recommendations</span>
            <span className="ml-auto badge-red text-[10px]">
              {dashboardData.recommendations?.length ?? 0} Actions
            </span>
          </div>

          <div className="space-y-3">
            {(dashboardData.recommendations ?? []).map((rec: any, i: number) => (
              <div key={i} className="glass-card p-4 flex items-start gap-4 group">
                <div className="mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                  style={{ background: 'rgba(255,77,109,0.12)', border: '1px solid rgba(255,77,109,0.2)' }}>
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-100 truncate">{rec.action}</h3>
                    <span className="badge-red flex-shrink-0">Urgent</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Impact: <span className="text-gray-300">{rec.impact}</span>
                    {rec.owner && <> · Owner: <span className="text-azure-400">{rec.owner}</span></>}
                  </p>
                </div>
                <button className="btn-primary text-xs px-3 py-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Delegate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 3: Intelligence Feed + Risk Bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Executive Intelligence Feed */}
        <div className="glass-panel p-6">
          <div className="section-header mb-5">
            <div className="icon-wrap" style={{ background: 'rgba(124,58,237,0.15)' }}>
              <Clock className="w-4 h-4 text-violet-400" />
            </div>
            <span>Executive Intelligence Feed</span>
            <span className="ml-auto text-[10px] text-gray-600">Live</span>
          </div>

          <div className="relative pl-5 border-l space-y-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {(dashboardData.intelligence_feed ?? []).map((feed: any, i: number) => (
              <div key={i} className="relative">
                <div className="timeline-dot"
                  style={{
                    background: feed.type === 'risk' ? '#FF4D6D' : '#00E676',
                    boxShadow: `0 0 8px ${feed.type === 'risk' ? 'rgba(255,77,109,0.7)' : 'rgba(0,230,118,0.7)'}`,
                    border: '2px solid #020817',
                  }} />
                <div className="text-[10px] text-gray-600 mb-1 font-medium tracking-wide">{feed.time}</div>
                <div className="glass-card p-3 text-sm text-gray-300 hover:text-gray-100 cursor-pointer flex items-center justify-between gap-2">
                  <span>{feed.message}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="glass-panel p-6">
          <div className="section-header mb-5">
            <div className="icon-wrap" style={{ background: 'rgba(255,77,109,0.15)' }}>
              <BarChart3 className="w-4 h-4 text-rose-400" />
            </div>
            <span>Risk Distribution</span>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Critical',  count: dashboardData.risks?.critical ?? 4,  total: 15, color: '#FF4D6D' },
              { label: 'High',      count: dashboardData.risks?.high ?? 5,      total: 15, color: '#FFB300' },
              { label: 'Medium',    count: dashboardData.risks?.medium ?? 4,    total: 15, color: '#00BFFF' },
              { label: 'Low',       count: dashboardData.risks?.low ?? 2,       total: 15, color: '#00E676' },
            ].map(r => (
              <div key={r.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-400">{r.label}</span>
                  <span className="text-xs font-bold" style={{ color: r.color }}>{r.count}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill"
                    style={{
                      width: `${(r.count / r.total) * 100}%`,
                      background: r.color,
                      boxShadow: `0 0 8px ${r.color}60`,
                    }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
            <p className="text-xs text-gray-500 leading-relaxed">
              Risk signals are extracted from <span className="text-gray-300">Outlook emails</span>, <span className="text-gray-300">Teams messages</span>, and <span className="text-gray-300">Planner tasks</span> by the ChiefIQ intelligence engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

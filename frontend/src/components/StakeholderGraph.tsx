import React from 'react';
import { Users, AlertTriangle, TrendingDown, User, Mail, MessageSquare, ArrowRight } from 'lucide-react';

const STAKEHOLDERS = [
  { name: 'Sarah Chen',       role: 'VP Operations',       status: 'active',   projects: 3, sentiment: 88, color: '#2899F5' },
  { name: 'Marcus Johnson',   role: 'CFO',                  status: 'active',   projects: 2, sentiment: 82, color: '#00E676' },
  { name: 'Elena Rodriguez',  role: 'Eng. Director',        status: 'critical', projects: 4, sentiment: 65, color: '#FF4D6D' },
  { name: 'David Kim',        role: 'PMO Lead',             status: 'silent',   projects: 2, sentiment: 40, color: '#FFB300' },
  { name: 'Aisha Patel',      role: 'Compliance Manager',   status: 'active',   projects: 2, sentiment: 79, color: '#BF5FFF' },
  { name: 'Tom Baker',        role: 'Finance Analyst',      status: 'active',   projects: 3, sentiment: 74, color: '#00BFFF' },
  { name: 'James Wilson',     role: 'CEO',                  status: 'active',   projects: 5, sentiment: 90, color: '#00E676' },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:   { label: 'Active',   color: '#00E676', bg: 'rgba(0,230,118,0.1)',  border: 'rgba(0,230,118,0.25)' },
  silent:   { label: 'Silent',   color: '#FFB300', bg: 'rgba(255,179,0,0.1)',  border: 'rgba(255,179,0,0.25)' },
  critical: { label: 'Blocker',  color: '#FF4D6D', bg: 'rgba(255,77,109,0.1)', border: 'rgba(255,77,109,0.25)' },
};

const GAPS = [
  { type: 'silent',   name: 'David Kim',       detail: 'No Teams response in >72 hours. Blocking 4 tasks on Project Atlas.' },
  { type: 'critical', name: 'Elena Rodriguez', detail: 'Single point of failure for 3 critical approval paths in Project Phoenix.' },
];

const StakeholderGraph: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 animate-fade-up">

      {/* Header */}
      <div className="glass-panel p-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,230,118,0.12)' }}>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Stakeholder Intelligence</h2>
        </div>
        <p className="text-xs text-gray-500 ml-10">AI-detected communication gaps, engagement patterns, and collaboration health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Stakeholder Grid */}
        <div className="lg:col-span-2 glass-panel p-5">
          <div className="section-header mb-4">
            <div className="icon-wrap" style={{ background: 'rgba(40,153,245,0.12)' }}>
              <User className="w-3.5 h-3.5 text-azure-400" />
            </div>
            <span>Team Members</span>
            <span className="ml-auto text-[10px] text-gray-600">{STAKEHOLDERS.length} stakeholders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STAKEHOLDERS.map((s) => {
              const cfg = STATUS_CONFIG[s.status];
              return (
                <div key={s.name} className="glass-card p-4 group cursor-default">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}30` }}>
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-100 truncate">{s.name}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                          style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                          {cfg.label}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-500">{s.role}</span>
                    </div>
                  </div>

                  {/* Sentiment & Projects */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <div className="text-lg font-bold" style={{ color: s.sentiment >= 75 ? '#00E676' : s.sentiment >= 55 ? '#FFB300' : '#FF4D6D' }}>{s.sentiment}</div>
                      <div className="text-[9px] text-gray-600 uppercase tracking-wider">Sentiment</div>
                    </div>
                    <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <div className="text-lg font-bold text-azure-400">{s.projects}</div>
                      <div className="text-[9px] text-gray-600 uppercase tracking-wider">Projects</div>
                    </div>
                  </div>

                  {/* Sentiment bar */}
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{
                      width: `${s.sentiment}%`,
                      background: s.sentiment >= 75 ? '#00E676' : s.sentiment >= 55 ? '#FFB300' : '#FF4D6D',
                      boxShadow: `0 0 6px ${s.sentiment >= 75 ? 'rgba(0,230,118,0.4)' : s.sentiment >= 55 ? 'rgba(255,179,0,0.4)' : 'rgba(255,77,109,0.4)'}`,
                    }} />
                  </div>

                  {/* Quick actions */}
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] text-gray-400 hover:text-gray-200 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <Mail className="w-3 h-3" /> Email
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] text-gray-400 hover:text-gray-200 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <MessageSquare className="w-3 h-3" /> Teams
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Gaps & Health */}
        <div className="flex flex-col gap-4">

          {/* Communication Gaps */}
          <div className="glass-panel p-5">
            <div className="section-header mb-4">
              <div className="icon-wrap" style={{ background: 'rgba(255,77,109,0.12)' }}>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <span className="text-rose-400">Communication Gaps</span>
            </div>
            <div className="space-y-3">
              {GAPS.map((g, i) => {
                const cfg = STATUS_CONFIG[g.type];
                return (
                  <div key={i} className="p-3.5 rounded-xl" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <div className="text-xs font-bold mb-1.5" style={{ color: cfg.color }}>{g.name}</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{g.detail}</p>
                    <button className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-white transition-colors">
                      Escalate <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Health */}
          <div className="glass-panel p-5">
            <div className="section-header mb-4">
              <div className="icon-wrap" style={{ background: 'rgba(0,191,255,0.12)' }}>
                <TrendingDown className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span>Org Health</span>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Team Morale',        score: 72, color: '#FFB300' },
                { label: 'Exec Confidence',    score: 88, color: '#00E676' },
                { label: 'Eng Engagement',     score: 65, color: '#FFB300' },
                { label: 'Compliance Health',  score: 59, color: '#FF4D6D' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[11px] text-gray-400">{m.label}</span>
                    <span className="text-[11px] font-bold" style={{ color: m.color }}>{m.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${m.score}%`, background: m.color, boxShadow: `0 0 6px ${m.color}40` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderGraph;

import React, { useState } from 'react';
import { useAppStore } from '../store/store';
import { Shield, TrendingUp, TrendingDown, Minus, AlertTriangle, ChevronRight, Flame, ArrowUpRight } from 'lucide-react';

const SEVERITY_CONFIG: Record<string, { color: string; bg: string; border: string; label: string }> = {
  Critical: { color: '#FF4D6D', bg: 'rgba(255,77,109,0.08)',  border: 'rgba(255,77,109,0.25)',  label: 'Critical' },
  High:     { color: '#FFB300', bg: 'rgba(255,179,0,0.08)',   border: 'rgba(255,179,0,0.25)',   label: 'High' },
  Medium:   { color: '#00BFFF', bg: 'rgba(0,191,255,0.08)',   border: 'rgba(0,191,255,0.25)',   label: 'Medium' },
  Low:      { color: '#00E676', bg: 'rgba(0,230,118,0.08)',   border: 'rgba(0,230,118,0.25)',   label: 'Low' },
};

const VELOCITY_ICON: Record<string, JSX.Element> = {
  Worsening: <TrendingUp className="w-3.5 h-3.5" style={{ color: '#FF4D6D' }} />,
  Improving: <TrendingDown className="w-3.5 h-3.5" style={{ color: '#00E676' }} />,
  Stable:    <Minus className="w-3.5 h-3.5" style={{ color: '#FFB300' }} />,
};

const MOCK_RISKS = [
  {
    id: 'r1', title: 'Cloud Migration Vendor Delay',
    severity: 'Critical', velocity: 'Worsening',
    project: 'Project Phoenix', owner: 'Elena Rodriguez',
    root_cause: 'Vendor has not delivered the migration toolkit per the agreed SLA; 3 follow-up emails unanswered.',
    evidence: ['Email: "RE: Migration Toolkit Status" — 4 days overdue', 'Teams: No response from VendorX channel'],
    escalation: 'Escalate to VP Operations → James Wilson',
  },
  {
    id: 'r2', title: 'Budget Overrun Risk Q3',
    severity: 'Critical', velocity: 'Worsening',
    project: 'Project Orion', owner: 'Tom Baker',
    root_cause: 'Current spend rate projects a 22% overage by end of Q3 based on Planner task completion velocity.',
    evidence: ['SharePoint: Budget_Q3.xlsx', 'Planner: 14 tasks behind schedule'],
    escalation: 'Escalate to CFO → Marcus Johnson',
  },
  {
    id: 'r3', title: 'Compliance Audit Delay',
    severity: 'High', velocity: 'Stable',
    project: 'Project Orion', owner: 'Aisha Patel',
    root_cause: 'Legal has not provided sign-off on the data residency clause required for EU compliance.',
    evidence: ['Email: "Compliance Audit Sign-off Required"', 'Calendar: 2 missed Legal review meetings'],
    escalation: 'Escalate to General Counsel',
  },
  {
    id: 'r4', title: 'Key Resource Single Point of Failure',
    severity: 'High', velocity: 'Stable',
    project: 'Project Atlas', owner: 'David Kim',
    root_cause: 'David Kim is the only team member with admin access to the production Azure environment.',
    evidence: ['Teams: David Kim last active 74 hours ago', 'Planner: 4 blocked tasks awaiting his approval'],
    escalation: 'Reassign responsibilities → backup admin designation',
  },
  {
    id: 'r5', title: 'Stakeholder Engagement Drop',
    severity: 'Medium', velocity: 'Improving',
    project: 'Project Horizon', owner: 'Sarah Chen',
    root_cause: 'Executive stakeholder participation in weekly syncs dropped from 90% to 55% over the last 4 weeks.',
    evidence: ['Calendar: 3 of 5 executives absent last sync', 'Teams: Channel activity down 40%'],
    escalation: 'Schedule 1:1 catch-up meetings with disengaged stakeholders',
  },
];

const RiskCenter: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filters = ['All', 'Critical', 'High', 'Medium', 'Low'];
  const filtered = filter === 'All' ? MOCK_RISKS : MOCK_RISKS.filter(r => r.severity === filter);
  const selectedRisk = MOCK_RISKS.find(r => r.id === selected);

  return (
    <div className="h-full flex gap-4 animate-fade-up">

      {/* ── Risk List ── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">

        {/* Header */}
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,77,109,0.15)' }}>
                  <Shield className="w-4 h-4 text-rose-400" />
                </div>
                <h2 className="text-base font-bold text-gray-100">Risk Intelligence</h2>
              </div>
              <p className="text-xs text-gray-500 ml-10">AI-detected organizational risks from emails, meetings, and communications.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="badge-red"><Flame className="w-3 h-3" /> {MOCK_RISKS.filter(r => r.severity === 'Critical').length} Critical</span>
              <span className="badge-amber">{MOCK_RISKS.filter(r => r.severity === 'High').length} High</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mt-4">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${filter === f
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'}`}
                style={filter === f
                  ? { background: 'rgba(0,120,212,0.2)', border: '1px solid rgba(0,120,212,0.35)', color: '#2899F5' }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Cards */}
        <div className="space-y-3 overflow-y-auto">
          {filtered.map((risk) => {
            const cfg = SEVERITY_CONFIG[risk.severity];
            const isActive = selected === risk.id;
            return (
              <div key={risk.id}
                onClick={() => setSelected(isActive ? null : risk.id)}
                className="glass-card p-5 cursor-pointer transition-all duration-200"
                style={isActive ? { border: `1px solid ${cfg.color}50`, background: cfg.bg } : {}}>

                <div className="flex items-start gap-4">
                  {/* Severity indicator */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <AlertTriangle className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-100">{risk.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                        {risk.severity}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-500">
                        {VELOCITY_ICON[risk.velocity] ?? null}
                        {risk.velocity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{risk.root_cause}</p>
                    <div className="flex items-center gap-3 text-[10px] text-gray-600">
                      <span className="text-gray-500">Project: <span className="text-gray-300">{risk.project}</span></span>
                      <span>·</span>
                      <span className="text-gray-500">Owner: <span className="text-azure-400">{risk.owner}</span></span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 text-gray-600 flex-shrink-0 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} />
                </div>

                {/* Expanded detail */}
                {isActive && (
                  <div className="mt-4 pt-4 space-y-3 animate-fade-up" style={{ borderTop: `1px solid ${cfg.border}` }}>
                    <div>
                      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Evidence Sources</div>
                      <div className="space-y-1.5">
                        {risk.evidence.map((ev, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-300 px-3 py-2 rounded-lg"
                            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cfg.color }} />
                            {ev}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
                      style={{ background: 'rgba(255,77,109,0.06)', border: '1px solid rgba(255,77,109,0.15)' }}>
                      <ArrowUpRight className="w-4 h-4 text-rose-400 flex-shrink-0" />
                      <div>
                        <div className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider mb-0.5">Escalation Path</div>
                        <div className="text-xs text-gray-300">{risk.escalation}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stats Sidebar ── */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-4">
        <div className="glass-panel p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Risk Summary</div>
          <div className="space-y-3">
            {Object.entries(SEVERITY_CONFIG).map(([key, cfg]) => {
              const count = MOCK_RISKS.filter(r => r.severity === key).length;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium" style={{ color: cfg.color }}>{key}</span>
                    <span className="text-gray-400 font-bold">{count}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill"
                      style={{ width: `${(count / MOCK_RISKS.length) * 100}%`, background: cfg.color, boxShadow: `0 0 6px ${cfg.color}50` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Velocity Trend</div>
          <div className="space-y-2">
            {[
              { label: 'Worsening', count: MOCK_RISKS.filter(r => r.velocity === 'Worsening').length, color: '#FF4D6D' },
              { label: 'Stable',    count: MOCK_RISKS.filter(r => r.velocity === 'Stable').length,    color: '#FFB300' },
              { label: 'Improving', count: MOCK_RISKS.filter(r => r.velocity === 'Improving').length, color: '#00E676' },
            ].map(v => (
              <div key={v.label} className="flex items-center justify-between glass-card px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {VELOCITY_ICON[v.label]}
                  <span className="text-xs text-gray-400">{v.label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: v.color }}>{v.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskCenter;

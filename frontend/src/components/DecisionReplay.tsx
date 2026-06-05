import React, { useState } from 'react';
import { GitBranch, Clock, User, FileText, CheckCircle2, Search, ChevronRight, Calendar } from 'lucide-react';

const DECISIONS = [
  {
    id: 'd1',
    title: 'Approve Azure Migration Vendor',
    outcome: 'Approved',
    date: '2026-03-10',
    project: 'Project Phoenix',
    owner: 'Sarah Chen',
    timeline: [
      { event: 'Requirements Gathering Initiated', date: '2026-02-05', actor: 'Elena Rodriguez', type: 'doc' },
      { event: 'RFP Sent to 3 Vendors', date: '2026-02-14', actor: 'Tom Baker', type: 'email' },
      { event: 'Vendor Presentations & Scoring', date: '2026-02-28', actor: 'Architecture Sync Meeting', type: 'meeting' },
      { event: 'Executive Approval Requested', date: '2026-03-07', actor: 'James Wilson', type: 'email' },
      { event: 'Final Approval Granted', date: '2026-03-10', actor: 'Sarah Chen', type: 'approval' },
    ],
    documents: ['RFP_v2.docx', 'Vendor_Comparison.xlsx', 'Legal_Sign-off.pdf'],
    approval_chain: 'Elena Rodriguez → James Wilson → Sarah Chen',
  },
  {
    id: 'd2',
    title: 'Q3 Budget Reallocation',
    outcome: 'In Review',
    date: '2026-05-20',
    project: 'Project Orion',
    owner: 'Marcus Johnson',
    timeline: [
      { event: 'Budget Overrun Alert Detected', date: '2026-05-01', actor: 'ChiefIQ AI', type: 'ai' },
      { event: 'Finance Review Meeting', date: '2026-05-10', actor: 'Tom Baker', type: 'meeting' },
      { event: 'Reallocation Proposal Submitted', date: '2026-05-20', actor: 'Marcus Johnson', type: 'doc' },
    ],
    documents: ['Budget_Reallocation_Q3.docx', 'Finance_Review_Notes.pdf'],
    approval_chain: 'Tom Baker → Marcus Johnson → CFO Pending',
  },
  {
    id: 'd3',
    title: 'Cloud Compliance Framework Adoption',
    outcome: 'Approved',
    date: '2026-01-15',
    project: 'Project Orion',
    owner: 'Aisha Patel',
    timeline: [
      { event: 'EU Compliance Requirement Flagged', date: '2025-12-01', actor: 'Legal Team', type: 'doc' },
      { event: 'Framework Evaluation', date: '2025-12-20', actor: 'Aisha Patel', type: 'meeting' },
      { event: 'Board Approval Granted', date: '2026-01-15', actor: 'Sarah Chen', type: 'approval' },
    ],
    documents: ['GDPR_Framework_Assessment.pdf', 'Board_Approval_Jan.pdf'],
    approval_chain: 'Aisha Patel → Legal → Sarah Chen',
  },
];

const TYPE_CONFIG: Record<string, { color: string; bg: string; icon: JSX.Element; label: string }> = {
  doc:      { color: '#2899F5', bg: 'rgba(40,153,245,0.15)', icon: <FileText className="w-3 h-3" />,    label: 'Document' },
  email:    { color: '#BF5FFF', bg: 'rgba(191,95,255,0.15)', icon: <Search className="w-3 h-3" />,      label: 'Email' },
  meeting:  { color: '#FFB300', bg: 'rgba(255,179,0,0.15)', icon: <Calendar className="w-3 h-3" />,     label: 'Meeting' },
  approval: { color: '#00E676', bg: 'rgba(0,230,118,0.15)', icon: <CheckCircle2 className="w-3 h-3" />, label: 'Approval' },
  ai:       { color: '#00BFFF', bg: 'rgba(0,191,255,0.15)', icon: <Search className="w-3 h-3" />,       label: 'AI Detection' },
};

const DecisionReplay: React.FC = () => {
  const [selected, setSelected] = useState<string>(DECISIONS[0].id);
  const decision = DECISIONS.find(d => d.id === selected)!;

  return (
    <div className="h-full flex gap-4 animate-fade-up">

      {/* ── Decision List ── */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-3">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,179,0,0.15)' }}>
              <GitBranch className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <h2 className="text-sm font-bold text-gray-100">Decision Replay</h2>
          </div>
          <p className="text-[10px] text-gray-500 ml-9">Reconstruct how decisions were made.</p>
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto">
          {DECISIONS.map((d) => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              className={`w-full text-left glass-card p-4 transition-all duration-200 ${selected === d.id ? 'ring-1' : ''}`}
              style={selected === d.id ? { ringColor: '#0078D4', border: '1px solid rgba(0,120,212,0.4)', background: 'rgba(0,120,212,0.06)' } : {}}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xs font-semibold text-gray-200 leading-snug">{d.title}</h3>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${d.outcome === 'Approved' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'}`}>
                  {d.outcome}
                </span>
              </div>
              <div className="text-[10px] text-gray-500">{d.project}</div>
              <div className="text-[10px] text-gray-600 flex items-center gap-1 mt-1">
                <Clock className="w-2.5 h-2.5" /> {d.date}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Replay View ── */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">

        {/* Decision header */}
        <div className="glass-panel p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge-${decision.outcome === 'Approved' ? 'green' : 'amber'} text-xs`}>
                  {decision.outcome === 'Approved' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                  {decision.outcome}
                </span>
                <span className="text-gray-600 text-xs">{decision.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{decision.title}</h2>
              <p className="text-xs text-gray-500">
                Project: <span className="text-gray-300">{decision.project}</span>
                <span className="mx-2 text-gray-700">·</span>
                Owner: <span className="text-azure-400">{decision.owner}</span>
              </p>
            </div>
          </div>

          {/* Approval chain */}
          <div className="mt-4 px-4 py-3 rounded-xl flex items-center gap-2 flex-wrap"
            style={{ background: 'rgba(0,120,212,0.06)', border: '1px solid rgba(0,120,212,0.15)' }}>
            <User className="w-3.5 h-3.5 text-azure-400 flex-shrink-0" />
            <span className="text-[10px] font-semibold text-azure-400 uppercase tracking-wider flex-shrink-0">Approval Chain:</span>
            <span className="text-xs text-gray-300">{decision.approval_chain}</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-panel p-5 flex-1 overflow-y-auto">
          <div className="section-header mb-6">
            <div className="icon-wrap" style={{ background: 'rgba(124,58,237,0.15)' }}>
              <Clock className="w-3.5 h-3.5 text-violet-400" />
            </div>
            <span>Decision Timeline</span>
            <span className="ml-auto text-[10px] text-gray-600">{decision.timeline.length} events</span>
          </div>

          <div className="relative pl-6 border-l space-y-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            {decision.timeline.map((event, i) => {
              const cfg = TYPE_CONFIG[event.type] ?? TYPE_CONFIG.doc;
              return (
                <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="absolute -left-[1.4rem] w-3.5 h-3.5 rounded-full border-2 mt-1 flex-shrink-0"
                    style={{ background: '#020817', borderColor: cfg.color, boxShadow: `0 0 8px ${cfg.color}60` }} />

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1"
                      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <span className="text-[10px] text-gray-600">{event.date}</span>
                  </div>

                  <div className="p-3.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 className="text-sm font-semibold text-gray-200 mb-1">{event.event}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <User className="w-3 h-3" /> {event.actor}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Final outcome */}
            <div className="relative">
              <div className="absolute -left-[1.4rem] w-3.5 h-3.5 rounded-full border-2 mt-1"
                style={{ background: decision.outcome === 'Approved' ? '#00E676' : '#FFB300', borderColor: decision.outcome === 'Approved' ? '#00E676' : '#FFB300', boxShadow: `0 0 12px ${decision.outcome === 'Approved' ? 'rgba(0,230,118,0.6)' : 'rgba(255,179,0,0.6)'}` }} />
              <div className="p-3.5 rounded-xl text-sm font-semibold"
                style={{ background: decision.outcome === 'Approved' ? 'rgba(0,230,118,0.06)' : 'rgba(255,179,0,0.06)', border: `1px solid ${decision.outcome === 'Approved' ? 'rgba(0,230,118,0.2)' : 'rgba(255,179,0,0.2)'}`, color: decision.outcome === 'Approved' ? '#00E676' : '#FFB300' }}>
                Decision {decision.outcome}: {decision.title}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="glass-panel p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Supporting Documents</div>
          <div className="flex gap-2 flex-wrap">
            {decision.documents.map((doc) => (
              <div key={doc} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 cursor-pointer hover:text-white transition-colors"
                style={{ background: 'rgba(0,120,212,0.08)', border: '1px solid rgba(0,120,212,0.2)' }}>
                <FileText className="w-3.5 h-3.5 text-azure-400" />
                {doc}
                <ChevronRight className="w-3 h-3 text-gray-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionReplay;

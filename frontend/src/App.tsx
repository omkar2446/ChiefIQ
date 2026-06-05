import React, { useEffect } from 'react';
import { useAppStore } from './store/store';
import {
  LayoutDashboard, MessageSquare, AlertTriangle, GitBranch,
  Users, LayoutTemplate, Settings, Zap, Bell, ChevronRight
} from 'lucide-react';
import axios from 'axios';

import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import RiskCenter from './components/RiskCenter';
import DecisionReplay from './components/DecisionReplay';
import StakeholderGraph from './components/StakeholderGraph';
import ProjectCommandCenter from './components/ProjectCommandCenter';

const API_BASE = 'http://localhost:8000/api';

const navItems = [
  { id: 'dashboard',    icon: LayoutDashboard, label: 'Executive Dashboard', color: '#2899F5' },
  { id: 'chat',         icon: MessageSquare,   label: 'Ask ChiefIQ',         color: '#BF5FFF' },
  { id: 'risks',        icon: AlertTriangle,   label: 'Risk Intelligence',   color: '#FF4D6D' },
  { id: 'decisions',    icon: GitBranch,       label: 'Decision Replay',     color: '#FFB300' },
  { id: 'stakeholders', icon: Users,           label: 'Stakeholders',        color: '#00E676' },
  { id: 'projects',     icon: LayoutTemplate,  label: 'Command Center',      color: '#00BFFF' },
];

function App() {
  const { activeTab, setActiveTab, setDashboardData, setRisks, setIsLoading } = useAppStore();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [dashRes, risksRes] = await Promise.all([
          axios.get(`${API_BASE}/dashboard`),
          axios.get(`${API_BASE}/risks`),
        ]);
        setDashboardData(dashRes.data);
        setRisks(risksRes.data);
      } catch (e) { console.error('Error loading data', e); }
      setIsLoading(false);
    };
    load();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':    return <Dashboard />;
      case 'chat':         return <Chat />;
      case 'risks':        return <RiskCenter />;
      case 'decisions':    return <DecisionReplay />;
      case 'stakeholders': return <StakeholderGraph />;
      case 'projects':     return <ProjectCommandCenter />;
      default:             return <Dashboard />;
    }
  };

  const activeNavItem = navItems.find(n => n.id === activeTab);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#020817' }}>

      {/* ── SIDEBAR ── */}
      <aside className="w-64 flex flex-col z-20 flex-shrink-0" style={{
        background: 'linear-gradient(180deg, #0A0F1E 0%, #0D1526 100%)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}>

        {/* Logo */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 glow-blue"
              style={{ background: 'linear-gradient(135deg, #0078D4, #005FA3)' }}>
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">
                Chief<span className="text-gradient-blue">IQ</span>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-[0.15em] ml-12">
            AI Chief of Staff · M365
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

        {/* Status pill */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg flex items-center gap-2"
          style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.15)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-neon-emerald animate-pulse-slow" />
          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Agents Online</span>
          <span className="ml-auto text-[10px] text-gray-500">7/7</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${isActive ? 'active' : ''} animate-fade-up`}
                style={isActive ? { color: item.color } : {}}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={isActive
                    ? { background: `${item.color}20`, boxShadow: `0 0 10px ${item.color}30` }
                    : { background: 'rgba(255,255,255,0.04)' }
                  }>
                  <item.icon className="w-4 h-4" style={{ color: isActive ? item.color : undefined }} />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <ChevronRight className="ml-auto w-3.5 h-3.5 opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-8 h-8 rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #0078D4, #7C3AED)' }} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-200 truncate">Sarah Chen</div>
              <div className="text-[10px] text-azure-400 truncate">VP Operations</div>
            </div>
            <Settings className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Top header */}
        <header className="h-14 flex items-center justify-between px-6 flex-shrink-0"
          style={{
            background: 'rgba(10,15,30,0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
          }}>
          <div className="flex items-center gap-3">
            {activeNavItem && (
              <>
                <div className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: `${activeNavItem.color}20` }}>
                  <activeNavItem.icon className="w-3.5 h-3.5" style={{ color: activeNavItem.color }} />
                </div>
                <h1 className="text-sm font-semibold text-gray-200">{activeNavItem.label}</h1>
                <span className="text-gray-600">/</span>
              </>
            )}
            <span className="text-xs text-gray-500">Contoso Enterprise</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Value prop pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-gray-400"
              style={{ background: 'rgba(0,120,212,0.08)', border: '1px solid rgba(0,120,212,0.15)' }}>
              <span className="text-azure-400 font-medium">ChiefIQ</span>
              <span className="text-gray-600">·</span>
              <span>Emails → Decisions → Intelligence</span>
            </div>

            {/* Notification bell */}
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <Bell className="w-3.5 h-3.5 text-gray-400" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500"
                style={{ boxShadow: '0 0 6px rgba(255,77,109,0.8)' }} />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #0078D4, #7C3AED)', boxShadow: '0 0 12px rgba(0,120,212,0.4)' }} />
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-auto p-6 animate-fade-up">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;

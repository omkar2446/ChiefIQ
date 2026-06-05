import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, FileText, GitBranch, Sparkles, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
  "What are the biggest risks threatening Project Phoenix?",
  "Who are the silent stakeholders this week?",
  "Summarize the key decisions made in the last 30 days.",
  "What action items are overdue across all projects?",
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string; data?: any }[]>([
    {
      role: 'assistant',
      content:
        "Hello, Sarah. I'm **ChiefIQ**, your AI Chief of Staff.\n\nI've analyzed **5 active projects**, **15 organizational risks**, and **50+ communications** across your Microsoft 365 environment. I'm ready to surface decisions, priorities, and intelligence on demand.\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const query = text ?? input;
    if (!query.trim()) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/chat', { query });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.response, data: res.data },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error communicating with the LangGraph agents. Please check the backend.' },
      ]);
    }
    setIsLoading(false);
  };

  const lastAssistantData = [...messages].reverse().find((m) => m.role === 'assistant' && m.data)?.data;

  return (
    <div className="h-full flex gap-4">

      {/* ── Chat Area ── */}
      <div className="flex-1 glass-panel flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-5 py-3.5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0078D4, #7C3AED)', boxShadow: '0 0 15px rgba(0,120,212,0.4)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-100">Ask ChiefIQ</div>
              <div className="text-[10px] text-azure-400">Analyzes emails · meetings · chats · documents</div>
            </div>
          </div>
          <button className="btn-ghost text-xs py-1.5 px-3">
            <FileText className="w-3.5 h-3.5" /> Export Brief
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Suggestion chips — show only when there's just the welcome message */}
          {messages.length === 1 && (
            <div className="flex flex-col gap-2 mb-2">
              <p className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest mb-1">Quick questions</p>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => handleSend(s)}
                  className="text-left text-xs text-gray-400 hover:text-gray-200 px-3.5 py-2.5 rounded-xl transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-fade-up`}>

              {/* Bot avatar */}
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, rgba(0,120,212,0.3), rgba(124,58,237,0.3))', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Bot className="w-4 h-4 text-azure-400" />
                </div>
              )}

              {/* Bubble */}
              <div className={`max-w-[78%] ${msg.role === 'user' ? 'rounded-2xl rounded-tr-sm' : 'glass-card'} p-4 text-sm`}
                style={msg.role === 'user' ? {
                  background: 'linear-gradient(135deg, #0078D4, #005FA3)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0,120,212,0.3)',
                } : {}}>

                {msg.role === 'assistant' ? (
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-p:text-gray-300 prose-strong:text-white">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <span className="text-white">{msg.content}</span>
                )}

                {/* Evidence & confidence */}
                {msg.data && (
                  <div className="mt-4 pt-3.5 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    {/* Confidence bar */}
                    <div>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Agent Confidence</span>
                        <span className="text-[10px] font-bold text-neon-emerald">{msg.data.confidence_score}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill"
                          style={{ width: `${msg.data.confidence_score}%`, background: 'linear-gradient(90deg, #0078D4, #00E676)', boxShadow: '0 0 8px rgba(0,230,118,0.4)' }} />
                      </div>
                    </div>
                    {/* Evidence sources */}
                    <div>
                      <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Evidence Sources</div>
                      <div className="flex gap-2 flex-wrap">
                        {(msg.data.evidence ?? []).map((ev: any, j: number) => (
                          <div key={j} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-gray-300"
                            style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            {ev.type === 'email'
                              ? <FileText className="w-3 h-3 text-azure-400" />
                              : <Bot className="w-3 h-3 text-violet-400" />}
                            <span className="truncate max-w-[140px]">{ev.summary}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User avatar */}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #BF5FFF)', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3 animate-fade-up">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,120,212,0.15)', border: '1px solid rgba(0,120,212,0.2)' }}>
                <Bot className="w-4 h-4 text-azure-400" />
              </div>
              <div className="glass-card px-5 py-4 flex items-center gap-1.5">
                {[0, 1, 2].map((d) => (
                  <div key={d} className="w-2 h-2 rounded-full bg-azure-400 animate-bounce"
                    style={{ animationDelay: `${d * 100}ms` }} />
                ))}
                <span className="ml-2 text-xs text-gray-500">Analyzing M365 signals…</span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask ChiefIQ about decisions, priorities, risks, stakeholders, or projects…"
              className="input-premium pr-14"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg, #0078D4, #005FA3)', boxShadow: '0 4px 12px rgba(0,120,212,0.4)' }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-[10px] text-gray-600 mt-2 text-center">
            ChiefIQ analyzes emails, meetings, chats, and documents · Powered by Google Gemini
          </p>
        </div>
      </div>

      {/* ── Reasoning Trace Sidebar ── */}
      <div className="w-72 glass-panel flex flex-col overflow-hidden flex-shrink-0">
        <div className="px-4 py-3.5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,120,212,0.15)' }}>
              <GitBranch className="w-3.5 h-3.5 text-azure-400" />
            </div>
            <span className="text-sm font-semibold text-gray-200">Agent Reasoning Trace</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">LangGraph multi-agent execution flow</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {lastAssistantData?.reasoning_trace ? (
            <div className="relative pl-5 border-l space-y-5" style={{ borderColor: 'rgba(0,120,212,0.2)' }}>
              {lastAssistantData.reasoning_trace.map((trace: any, i: number) => (
                <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="absolute -left-[1.3rem] w-3.5 h-3.5 rounded-full border-2 mt-0.5 flex-shrink-0"
                    style={{ background: '#020817', borderColor: '#0078D4', boxShadow: '0 0 8px rgba(0,120,212,0.6)' }} />
                  <div className="text-[11px] font-semibold mb-1" style={{ color: '#2899F5' }}>{trace.agent}</div>
                  <div className="text-[11px] text-gray-400 leading-relaxed p-2.5 rounded-lg"
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {trace.action}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="w-2.5 h-2.5 text-gray-600" />
                    <span className="text-[9px] text-gray-600">Step {i + 1} of {lastAssistantData.reasoning_trace.length}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(0,120,212,0.08)', border: '1px solid rgba(0,120,212,0.15)' }}>
                <GitBranch className="w-6 h-6 text-azure-500" />
              </div>
              <p className="text-xs text-gray-600 leading-relaxed max-w-[180px]">
                Submit a query to see the multi-agent execution flow in real time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

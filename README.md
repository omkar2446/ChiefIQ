<div align="center">
  <h1>⚡ ChiefIQ</h1>
  <p><strong>AI Chief of Staff for Microsoft 365</strong></p>
  <p>Transforms emails, meetings, chats, and documents into decisions, priorities, and actionable intelligence.</p>
</div>

<h2>Project Summary</h2>
<p>ChiefIQ is a demo AI assistant for Microsoft 365 organizations. It combines a FastAPI backend, a LangGraph multi-agent pipeline, and a React frontend to surface risks, decisions, stakeholder gaps, and executive actions.</p>

<h2>What this repo contains</h2>
<ul>
  <li>Backend API in <code>backend/main.py</code> with dashboard, chat, risk, decision, stakeholder, and project endpoints.</li>
  <li>AI orchestration logic in <code>backend/agents/orchestrator.py</code> and <code>backend/agents/nodes.py</code>.</li>
  <li>Intelligence extraction functions in <code>backend/agents/intelligence.py</code> with Pydantic schemas for decisions, action items, risks, sentiment, and recommendations.</li>
  <li>Mock Microsoft 365-like dataset in <code>backend/mock_data.py</code> for people, projects, risks, decisions, and emails.</li>
  <li>React + Vite frontend in <code>frontend/</code> with dashboard, chat, risk center, decision replay, stakeholder intelligence, and project command center components.</li>
</ul>

<h2>Backend features</h2>
<ul>
  <li><strong>CORS-enabled FastAPI</strong> for local frontend integration.</li>
  <li>Endpoints:
    <ul>
      <li><code>GET /api/dashboard</code></li>
      <li><code>POST /api/chat</code></li>
      <li><code>GET /api/risks</code></li>
      <li><code>GET /api/decisions</code></li>
      <li><code>GET /api/stakeholders</code></li>
      <li><code>GET /api/projects</code></li>
    </ul>
  </li>
  <li><strong>Chat endpoint</strong> returns an executive brief, confidence score, evidence items, reasoning trace, and execution time.</li>
  <li><strong>LangGraph orchestrator</strong> composes seven agent steps: knowledge retrieval, context synthesis, risk intelligence, decision intelligence, stakeholder mapping, recommendation, and executive brief.</li>
  <li>Fallback simulation mode is used when Gemini credentials are not available.</li>
</ul>

<h2>Frontend features</h2>
<ul>
  <li>React + Vite application with modern UI and state managed by Zustand.</li>
  <li>Navigation tabs for dashboard, chat, risks, decisions, stakeholders, and projects.</li>
  <li>Chat interface includes suggestion chips, Markdown responses, evidence cards, confidence bars, and a reasoning trace sidebar.</li>
  <li>Dashboard presents an org health gauge, AI recommendations, executive intelligence feed, and risk distribution metrics.</li>
  <li>Risk center uses mock risk cards, severity filters, root cause details, evidence sources, and escalation guidance.</li>
  <li>Decision replay reconstructs decision timelines, approval chains, and documents tied to each decision.</li>
  <li>Stakeholder intelligence surface sentiment scores, silent stakeholders, and communication gaps.</li>
  <li>Project command center shows RAG status, AI health narratives, and budget burn visualization.</li>
</ul>

<h2>Core code paths</h2>
<ul>
  <li><code>backend/main.py</code>: API router and response formatting.</li>
  <li><code>backend/mock_data.py</code>: Mock people, projects, risks, decisions, and emails used throughout the app.</li>
  <li><code>backend/agents/intelligence.py</code>: Pydantic models and intelligence functions.</li>
  <li><code>backend/agents/orchestrator.py</code>: LangGraph workflow definition and initial state.</li>
  <li><code>backend/agents/nodes.py</code>: Agent implementations that populate context, risks, decisions, stakeholder maps, and recommendations.</li>
  <li><code>frontend/src/App.tsx</code>: App shell, navigation, and backend data loading.</li>
  <li><code>frontend/src/components/Chat.tsx</code>: Chat UI, frontend query handling, and response rendering.</li>
  <li><code>frontend/src/components/Dashboard.tsx</code>: Executive metrics, recommendations, and intelligence feed.</li>
  <li><code>frontend/src/components/RiskCenter.tsx</code>: Risk discovery and exploration view.</li>
  <li><code>frontend/src/components/DecisionReplay.tsx</code>: Decision timeline and supporting documents view.</li>
  <li><code>frontend/src/components/StakeholderGraph.tsx</code>: Stakeholder health and communication gap analysis.</li>
  <li><code>frontend/src/components/ProjectCommandCenter.tsx</code>: Project RAG and budget burn dashboard.</li>
</ul>

<h2>Mock data model</h2>
<ul>
  <li><code>people</code>: stakeholder profiles and communication health.</li>
  <li><code>projects</code>: status, budget, milestones, and burn rates.</li>
  <li><code>risks</code>: severity, velocity, root cause, impact, escalation path, and evidence chain.</li>
  <li><code>decisions</code>: decision title, date, stakeholder timeline, rationale, and approval chain.</li>
  <li><code>emails</code>: simple mock email thread content used by the knowledge retrieval agent.</li>
</ul>

<h2>Run locally</h2>
<h3>Backend</h3>
<pre><code>cd backend
python -m venv venv
.\venv\Scripts\activate
pip install fastapi uvicorn langgraph langchain langchain-google-genai pydantic python-dotenv
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
</code></pre>

<h3>Frontend</h3>
<pre><code>cd frontend
npm install
npm run dev
</code></pre>

<p>Open <strong>http://localhost:5173</strong> in your browser once both backend and frontend are running.</p>

<h2>Gemini integration</h2>
<p>Optional Gemini support is configured via <code>backend/.env</code>. If no key is present, the backend falls back to simulation mode.</p>
<pre><code>GEMINI_API_KEY=your-gemini-api-key</code></pre>

<h2>Media assets</h2>
<p>The repository includes a <code>p/</code> folder with demo media:</p>
<ul>
  <li>1 video file: <code>p/2026-06-06 04-09-42.mp4</code></li>
  <li>6 screenshot images: <code>p/Screenshot 2026-06-06 042923.png</code>, <code>p/Screenshot 2026-06-06 042943.png</code>, <code>p/Screenshot 2026-06-06 043010.png</code>, <code>p/Screenshot 2026-06-06 043028.png</code>, <code>p/Screenshot 2026-06-06 043054.png</code>, and <code>p/Screenshot 2026-06-06 043119.png</code></li>
</ul>

<h2>Notes</h2>
<ul>
  <li>The app is built for demo use and uses mock M365 data instead of a live Microsoft Graph integration.</li>
  <li>Real AI mode is optional; the app still works with simulated intelligence responses.</li>
  <li>The frontend uses <code>lucide-react</code>, <code>react-markdown</code>, and <code>zustand</code>.</li>
</ul>

<div align="center">

# ⚡ ChiefIQ
### AI Chief of Staff for Microsoft 365

> *Transforms emails, meetings, chats, and documents into decisions, priorities, and actionable intelligence.*

[![Microsoft Agents League](https://img.shields.io/badge/Microsoft-Agents%20League-0078D4?style=for-the-badge&logo=microsoft)](https://www.microsoft.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![LangGraph](https://img.shields.io/badge/LangGraph-Multi--Agent-FF6B6B?style=for-the-badge)](https://langchain-ai.github.io/langgraph/)
[![Gemini](https://img.shields.io/badge/Google-Gemini%201.5%20Flash-4285F4?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)

</div>

---

## 📌 Table of Contents

1. [Problem Statement](#-problem-statement)
2. [What is ChiefIQ?](#-what-is-chiefiq)
3. [Key Features](#-key-features)
4. [System Architecture](#-system-architecture)
5. [Tech Stack](#-tech-stack)
6. [Project Structure](#-project-structure)
7. [The 7-Agent LangGraph System](#-the-7-agent-langgraph-system)
8. [10 Intelligence Functions](#-10-intelligence-functions)
9. [UI Modules](#-ui-modules)
10. [Getting Started](#-getting-started)
11. [Environment Variables](#-environment-variables)
12. [API Endpoints](#-api-endpoints)
13. [Activating Real AI (Gemini)](#-activating-real-ai-gemini)
14. [Azure Deployment](#-azure-deployment)
15. [Demo Script](#-demo-script-3-minutes)

---

## 🔴 Problem Statement

Modern organizations generate massive, fragmented information across Microsoft 365. Managers and executives waste hours:

- 🔍 **Searching for context** across Outlook, Teams, SharePoint, and Planner
- 📊 **Manually preparing** status updates and risk reports
- ⏱️ **Reacting to fires** instead of preventing them
- 🤝 **Missing stakeholder gaps** until it's too late
- 🗂️ **Losing institutional memory** — unable to reconstruct why decisions were made

> **The average executive spends 20% of their week just piecing together organizational context.**

---

## 💡 What is ChiefIQ?

**ChiefIQ** is a proactive, enterprise-grade AI Chief of Staff for Microsoft 365 organizations.

Unlike traditional Copilots that wait for you to ask questions, **ChiefIQ continuously monitors your organizational signals** — emails, meetings, chats, and documents — and proactively surfaces:

| Output | Description |
|--------|-------------|
| 🔴 **Risks** | Emerging project risks detected before they escalate |
| 🎯 **Priorities** | Ranked actions by business impact × urgency |
| ✅ **Decisions** | Extracted and logged from conversations |
| 👥 **Stakeholder Gaps** | Silent team members and communication bottlenecks |
| 📋 **Action Items** | Commitments and due dates extracted from messages |
| 📊 **Daily Brief** | Executive-ready morning intelligence report |

---

## ✨ Key Features

### 🤖 Multi-Agent AI Reasoning
- Powered by a **7-agent LangGraph orchestration pipeline**
- Each agent is specialized (Risk, Decision, Stakeholder, Recommendation, etc.)
- Full **Explainability Trace** — shows exactly which agent ran and why
- Every answer is backed by **evidence citations** (email threads, meeting transcripts)

### 🎯 Proactive Executive Intelligence
- Detects risks **before** they appear in status reports
- Reconstructs complete decision histories with approval chains
- Identifies stakeholder communication gaps in real time

### 💎 Premium Enterprise UI
- **Dark glassmorphic design** with Azure Blue accents
- Animated Org Health Score radial gauge
- Color-coded risk severity cards
- Interactive Decision Replay timeline
- Agent Reasoning Trace sidebar in Chat

### 🔌 Microsoft 365 Native
- Architected for **Microsoft Graph API** integration
- Supports Outlook, Teams, SharePoint, Planner data sources
- Azure-native deployment with Entra ID RBAC

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ChiefIQ Architecture                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   React Frontend (Vite + TypeScript + Tailwind CSS)              │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│   │Dashboard │ │  Chat    │ │  Risks   │ │Decisions │  ...     │
│   └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘          │
│        └────────────┼────────────┼─────────────┘                 │
│                     │  REST API  │                                │
├─────────────────────┼────────────┼───────────────────────────────┤
│   FastAPI Backend   │            │                                │
│        ┌────────────▼────────────▼────────────┐                  │
│        │         API Router (main.py)          │                  │
│        └────────────────────┬─────────────────┘                  │
│                             │                                     │
│        ┌────────────────────▼─────────────────┐                  │
│        │    LangGraph Orchestrator             │                  │
│        │    (agents/orchestrator.py)           │                  │
│        └──┬──┬──┬──┬──┬──┬──┬────────────────┘                  │
│           │  │  │  │  │  │  │                                     │
│    ┌──────▼┐ │ ┌▼─────┐ │ ┌▼──────────┐                         │
│    │Know-  │ │ │Risk  │ │ │Stakeholder│                         │
│    │ledge  │ │ │Intel │ │ │Mapping   │                         │
│    │Retr.  │ │ └──────┘ │ └──────────┘                         │
│    └───────┘ │          │                                         │
│        ┌─────▼───┐  ┌───▼────────┐  ┌──────────────┐            │
│        │Context  │  │Decision    │  │Recommendation│            │
│        │Synth.   │  │Intelligence│  │Agent         │            │
│        └─────────┘  └────────────┘  └──────┬───────┘            │
│                                             │                     │
│                              ┌──────────────▼───────────┐        │
│                              │  Executive Brief Agent   │        │
│                              │  (Gemini 1.5 Flash LLM)  │        │
│                              └──────────────────────────┘        │
│                                                                   │
│        ┌─────────────────────────────────────────────┐           │
│        │  Intelligence Engine (agents/intelligence.py)│           │
│        │  10 AI-powered extraction & prediction fns  │           │
│        └───────────────────────┬─────────────────────┘           │
│                                │                                   │
│        ┌───────────────────────▼──────────────────────┐          │
│        │   Data Layer: Mock M365 / Microsoft Graph API │          │
│        │   Outlook · Teams · SharePoint · Planner      │          │
│        └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Python** | 3.12 | Core runtime |
| **FastAPI** | 0.115+ | REST API server |
| **Uvicorn** | Latest | ASGI server |
| **LangGraph** | Latest | Multi-agent orchestration |
| **LangChain** | Latest | LLM abstraction layer |
| **LangChain Google GenAI** | Latest | Gemini API integration |
| **Pydantic** | v2 | Structured AI output schemas |
| **python-dotenv** | Latest | Environment variable management |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18 | UI framework |
| **Vite** | 6+ | Build tool & dev server |
| **TypeScript** | 5+ | Type safety |
| **Tailwind CSS** | 3 | Utility-first styling |
| **Zustand** | Latest | Global state management |
| **Axios** | Latest | HTTP client |
| **Lucide React** | Latest | Premium icon set |
| **React Markdown** | Latest | Markdown rendering in Chat |

---

## 📁 Project Structure

```
hackerhackton by microsoft/
│
├── 📄 README.md                    ← You are here
│
├── 🐍 backend/
│   ├── main.py                     ← FastAPI app & all API endpoints
│   ├── mock_data.py                ← Simulated M365 enterprise dataset
│   ├── .env                        ← API keys (create this file)
│   ├── requirements.txt            ← Python dependencies
│   ├── venv/                       ← Python virtual environment
│   │
│   └── agents/
│       ├── __init__.py
│       ├── state.py                ← AgentState TypedDict definition
│       ├── intelligence.py         ← 10 AI intelligence functions (core)
│       ├── nodes.py                ← 7 LangGraph agent node functions
│       └── orchestrator.py         ← LangGraph workflow compiler
│
├── ⚛️  frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js          ← Custom design token system
│   ├── vite.config.ts
│   │
│   └── src/
│       ├── App.tsx                 ← Root layout, sidebar, routing
│       ├── index.css               ← Global styles & component classes
│       ├── main.tsx
│       │
│       ├── store/
│       │   └── store.ts            ← Zustand global state
│       │
│       └── components/
│           ├── Dashboard.tsx       ← Executive Dashboard & health gauge
│           ├── Chat.tsx            ← Ask ChiefIQ conversational interface
│           ├── RiskCenter.tsx      ← Risk Intelligence center
│           ├── DecisionReplay.tsx  ← Decision Replay engine
│           ├── StakeholderGraph.tsx← Stakeholder Intelligence map
│           └── ProjectCommandCenter.tsx ← Project RAG command center
│
└── 📄 docs/
    ├── azure_deployment.md         ← Azure IaC deployment guide
    └── demo_script.md              ← 3-minute hackathon pitch script
```

---

## 🤖 The 7-Agent LangGraph System

When a user sends a message in the **Ask ChiefIQ** chat, the LangGraph orchestrator fires a sequential multi-agent pipeline:

```
User Query
    │
    ▼
┌─────────────────────────────┐
│ 1. Knowledge Retrieval      │  Searches M365 data: emails, transcripts, docs
└─────────────┬───────────────┘
              ▼
┌─────────────────────────────┐
│ 2. Context Synthesis        │  Builds entity relationship graph from signals
│                             │  Extracts: action items, meeting summaries, sentiment
└─────────────┬───────────────┘
              ▼
    ┌─────────┴──────────┐
    ▼                    ▼
┌──────────┐        ┌────────────────┐
│ 3. Risk  │        │ 4. Decision    │  (parallel paths)
│ Intel.   │        │ Intelligence   │
└──────┬───┘        └───────┬────────┘
    │                    │
    └─────────┬──────────┘
              ▼
┌─────────────────────────────┐
│ 5. Stakeholder Mapping      │  Detects communication gaps & bottlenecks
└─────────────┬───────────────┘
              ▼
┌─────────────────────────────┐
│ 6. Recommendation           │  Ranks actions by Impact × Urgency score
└─────────────┬───────────────┘
              ▼
┌─────────────────────────────┐
│ 7. Executive Brief          │  Gemini 1.5 Flash generates final response
│    (Real LLM)               │  with full organizational context as input
└─────────────────────────────┘
              │
              ▼
    Conversational Response
    + Explainability Trace
    + Evidence Citations
    + Confidence Score
```

Each agent step is logged in the **Explainability Trace**, visible in the React UI sidebar in real time.

---

## 🧠 10 Intelligence Functions

Located in `backend/agents/intelligence.py`. Each function supports **real AI mode** (Gemini API) with an automatic fallback to high-fidelity simulation:

| # | Function | Description | Output |
|---|----------|-------------|--------|
| 1 | `extract_decisions()` | Finds decisions in emails & Teams | Title, Owner, Status, Evidence |
| 2 | `extract_action_items()` | Detects tasks and commitments | Task, Assignee, Due Date, Source |
| 3 | `generate_priorities()` | Ranks org priorities by impact | Priority Score, Business Impact, Action |
| 4 | `analyze_meetings()` | Converts transcripts to briefings | Decisions, Risks, Action Items, Questions |
| 5 | `detect_communication_gaps()` | Finds silent stakeholders | Silent list, SPOF, Escalation recommendations |
| 6 | `generate_daily_brief()` | Full executive morning brief | Top priorities, risks, decisions, blockers |
| 7 | `predict_risks()` | Predicts risks from patterns | Probability, Severity, Mitigation |
| 8 | `analyze_stakeholder_sentiment()` | Measures org health via comms | Morale score, Confidence score, Frustration flags |
| 9 | `reconstruct_decision_timeline()` | Rebuilds decision history | Timeline, Stakeholders, Approval chain |
| 10 | `generate_recommendations()` | Proactive leadership actions | Ranked action list |

> All functions use **Pydantic v2 schemas** with `llm.with_structured_output()` to enforce precise JSON formatting from the Gemini model.

---

## 📱 UI Modules

### 1. 🏠 Executive Dashboard
- **Animated Org Health Score** radial gauge (dynamic glow color: green/amber/red)
- **4 Stat Cards**: Active Projects, Critical Risks, Pending Actions, Decisions Made
- **Top AI Recommendations** with impact score and delegate button
- **Executive Intelligence Feed** — live timeline of organizational anomalies
- **Risk Distribution** — color-coded progress bars by severity

### 2. 💬 Ask ChiefIQ (Chat)
- **Copilot-style conversational interface** powered by Gemini 1.5 Flash
- **Quick Suggestion Chips** for common executive queries
- **Agent Reasoning Trace** sidebar — shows exactly which agents ran
- **Evidence Citations** — every claim linked to a source email or transcript
- **Confidence Score Bar** — AI self-assessment of answer quality
- Auto-scrolling, typing indicator animation

### 3. 🔴 Risk Intelligence Center
- **Severity filter tabs** (All / Critical / High / Medium / Low)
- **Expandable risk cards** with root cause, evidence, and escalation path
- **Velocity indicators** (Worsening / Stable / Improving) with trend arrows
- **Risk Summary sidebar** with distribution bars and velocity counts

### 4. 🔀 Decision Replay Engine
- **Interactive decision list** with outcome badges
- **Color-coded timeline events** (Document / Email / Meeting / Approval / AI Detection)
- **Approval chain visualization**
- **Supporting documents panel** with clickable document links

### 5. 👥 Stakeholder Intelligence
- **Team member cards** with sentiment scores and project counts
- **Communication gap alerts** (Silent stakeholders, Single Points of Failure)
- **Org Health metrics** (Team Morale, Executive Confidence, Engagement)
- **Quick action buttons** (Email / Teams) on hover

### 6. 📊 Project Command Center
- **RAG matrix** (Red / Amber / Green) for all active initiatives
- **Budget burn rates** with visual progress bars
- **AI-generated project health narratives**

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **Python** >= 3.12
- **npm** or **yarn**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/chiefiq.git
cd "hackerhackton by microsoft"
```

---

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
.\venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn langgraph langchain langchain-google-genai pydantic python-dotenv
```

**Create your `.env` file:**
```bash
# backend/.env
GEMINI_API_KEY=your-gemini-api-key-here
```

**Start the backend server:**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

✅ Backend running at: `http://localhost:8000`
📄 API docs at: `http://localhost:8000/docs`

---

### 3. Frontend Setup

```bash
# From project root, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend running at: `http://localhost:5173`

---

### 4. Open the Application

Navigate to **[http://localhost:5173](http://localhost:5173)** in your browser.

The application will automatically load dashboard data from the backend API.

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ For real AI | Your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/) |

> **Without an API key**, ChiefIQ automatically falls back to a **high-fidelity simulation mode** — all UI features work perfectly for demo purposes.

---

## 📡 API Endpoints

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dashboard` | Org Health Score, recommendations, intelligence feed |
| `POST` | `/chat` | Send a query → LangGraph agents → AI response |
| `GET` | `/risks` | All organizational risks with severity and velocity |
| `GET` | `/decisions` | Historical decision logs |
| `GET` | `/stakeholders` | Stakeholder nodes and communication graph |
| `GET` | `/projects` | Active projects with RAG status |

### Example Chat Request

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What are the biggest risks threatening Project Phoenix?"}'
```

### Example Response
```json
{
  "response": "Based on organizational signals, there is an **85% probability** of a critical delay...",
  "reasoning_trace": [
    { "agent": "Knowledge Retrieval", "action": "Searched Graph API (Emails, Teams, Transcripts)" },
    { "agent": "Risk Intelligence", "action": "Pattern matched current risks and predicted emerging risks" },
    { "agent": "Executive Brief", "action": "Generated conversational response via Gemini" }
  ],
  "evidence": [
    { "type": "email", "summary": "Vendor delivery email — 4 days overdue" }
  ],
  "confidence_score": 92,
  "execution_time_ms": 1420
}
```

---

## 🤖 Activating Real AI (Gemini)

ChiefIQ has a two-mode system:

### 🟡 Simulation Mode (Default — No API Key Required)
- All 10 intelligence functions return rich, pre-built mock data
- LangGraph pipeline runs in full — only the final LLM call is simulated
- Perfect for demos and testing

### 🟢 Real AI Mode (Gemini 1.5 Flash)
1. Get your free API key from **[Google AI Studio](https://aistudio.google.com/)**
2. Open `backend/.env`
3. Replace the placeholder:
   ```
   GEMINI_API_KEY=AIzaSy...your-actual-key
   ```
4. Restart the backend server

The system auto-detects the key and switches to **Real AI Mode** instantly. The Gemini model receives the full organizational context (extracted risks, decisions, recommendations) and generates a dynamic, conversational, Markdown-formatted response tailored to your exact query.

---

## ☁️ Azure Deployment

ChiefIQ is designed for **one-click Azure deployment** using Azure Container Apps and Static Web Apps.

See the full deployment guide: [`docs/azure_deployment.md`](docs/azure_deployment.md)

### Services Used
| Azure Service | Purpose |
|--------------|---------|
| **Azure Container Apps** | Hosts the FastAPI backend |
| **Azure Static Web Apps** | Hosts the React frontend |
| **Azure OpenAI Service** | Production LLM (swap for Gemini) |
| **Azure AI Search** | Vector database for M365 RAG |
| **Microsoft Graph API** | Live M365 data connector |
| **Microsoft Entra ID** | Enterprise RBAC authentication |

### Quick Deploy
```bash
az login
az deployment group create \
  --resource-group rg-chiefiq-prod \
  --template-file infrastructure/main.bicep \
  --parameters environmentName=prod
```

---

## 🎤 Demo Script (3 Minutes)

See the full script: [`docs/demo_script.md`](docs/demo_script.md)

### Click Path for Judges

| Step | View | What to Show |
|------|------|-------------|
| 1 | **Executive Dashboard** | Org Health gauge + AI recommendations |
| 2 | **Ask ChiefIQ** | Type: *"What are the biggest risks threatening Project Phoenix?"* |
| 3 | **Reasoning Trace** | Show the 7-agent pipeline executing in real time |
| 4 | **Risk Intelligence** | Expand a Critical risk card to show evidence and escalation path |
| 5 | **Decision Replay** | Select "Approve Azure Migration Vendor" and walk the timeline |
| 6 | **Architecture** | Show the `docs/azure_deployment.md` for enterprise readiness |

---

## 🏆 Built For

**Microsoft Agents League — Enterprise Agent Category**

ChiefIQ demonstrates:
- ✅ **Production-grade multi-agent architecture** (LangGraph)
- ✅ **Deep M365 integration** (Microsoft Graph API ready)
- ✅ **Explainability & trust** (Reasoning trace, evidence citations)
- ✅ **Enterprise security design** (Entra ID, zero-retention AI)
- ✅ **Stunning premium UI** (Glassmorphism, Azure design language)

---

## 📄 License

MIT License — Built with ❤️ for the Microsoft Agents League Hackathon.

---

<div align="center">

**ChiefIQ** · AI Chief of Staff for Microsoft 365

*Transforms emails, meetings, chats, and documents into decisions, priorities, and actionable intelligence.*

</div>
#   C h i e f I Q  
 
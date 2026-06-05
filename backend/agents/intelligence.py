import os
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# Attempt to initialize LLM, but don't crash if key is missing
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import PromptTemplate
    import warnings
    # Suppress warnings if key is missing during import
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        if os.getenv("GEMINI_API_KEY") and os.getenv("GEMINI_API_KEY") != "your-gemini-api-key-here":
            llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0)
            use_real_ai = True
        else:
            llm = None
            use_real_ai = False
except Exception as e:
    print(f"Warning: LangChain initialization failed ({e}). Falling back to simulation.")
    llm = None
    use_real_ai = False

# --- PYDANTIC SCHEMAS ---

class DecisionItem(BaseModel):
    title: str = Field(description="The core decision that was made")
    owner: str = Field(description="Who approved or owns this decision")
    status: str = Field(description="Status of the decision (e.g. Approved, Pending)")
    evidence: List[str] = Field(description="Supporting documents or meetings")
    date: str = Field(description="Date the decision was made")

class Decisions(BaseModel):
    items: List[DecisionItem]

class ActionItem(BaseModel):
    task: str
    assignee: str
    due_date: str
    source: str
    status: str

class ActionItems(BaseModel):
    items: List[ActionItem]

class PriorityItem(BaseModel):
    priority_score: int
    business_impact: str
    recommended_action: str

class Priorities(BaseModel):
    items: List[PriorityItem]

class MeetingSummary(BaseModel):
    key_decisions: List[str]
    risks_discussed: List[str]
    action_items: List[str]
    unresolved_questions: List[str]

class CommunicationGaps(BaseModel):
    silent_stakeholders: List[str]
    single_points_of_failure: List[str]
    escalation_recommendations: List[str]

class RiskPrediction(BaseModel):
    risk_probability: str
    severity: str
    recommended_mitigation: str

class RiskPredictions(BaseModel):
    items: List[RiskPrediction]

class SentimentAnalysis(BaseModel):
    team_morale_score: int
    executive_confidence_score: int
    frustration_indicators: List[str]

class DecisionTimeline(BaseModel):
    timeline: List[Dict[str, str]] = Field(description="List of events with 'event' and 'date' keys")
    stakeholders_involved: List[str]
    supporting_documents: List[str]
    approval_chain: str

class Recommendation(BaseModel):
    action: str

class Recommendations(BaseModel):
    items: List[Recommendation]


# --- INTELLIGENCE FUNCTIONS ---

def extract_decisions(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(Decisions)
            prompt = f"Analyze the following organizational data and extract any key decisions made:\n\n{data}\n\nReturn the decisions."
            res = structured_llm.invoke(prompt)
            return [item.model_dump() for item in res.items]
        except Exception as e:
            print(f"AI Extraction failed: {e}. Using fallback.")
            
    # Fallback Simulation
    return [{
        "title": "Approve Azure migration vendor",
        "owner": "Sarah Chen",
        "status": "Approved",
        "evidence": ["Teams discussion: Architecture sync", "Email: Vendor sign-off"],
        "date": "2026-03-10"
    }]

def extract_action_items(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(ActionItems)
            prompt = f"Extract all action items, commitments, and due dates from this data:\n\n{data}"
            res = structured_llm.invoke(prompt)
            return [item.model_dump() for item in res.items]
        except Exception:
            pass
    return [{
        "task": "Finalize Q3 budget reallocation",
        "assignee": "Tom Baker",
        "due_date": "2026-06-10",
        "source": "Email thread: Budget Review",
        "status": "Pending"
    }]

def generate_priorities(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(Priorities)
            res = structured_llm.invoke(f"Rank the top organizational priorities based on impact, urgency, and risks in this data:\n\n{data}")
            return [item.model_dump() for item in res.items]
        except Exception:
            pass
    return [{
        "priority_score": 95,
        "business_impact": "$240K potential revenue loss",
        "recommended_action": "Resolve Cloud Migration Delay Risk by escalating to Vendor Manager"
    }]

def analyze_meetings(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(MeetingSummary)
            res = structured_llm.invoke(f"Summarize the key decisions, risks, and action items from these meeting transcripts:\n\n{data}")
            return [res.model_dump()]
        except Exception:
            pass
    return [{
        "key_decisions": ["Proceed with Project Atlas beta release"],
        "risks_discussed": ["Resource constraints in UAT"],
        "action_items": ["Aisha to prepare beta release notes"],
        "unresolved_questions": ["Will Legal approve the Orion compliance audit in time?"]
    }]

def detect_communication_gaps(data) -> Dict[str, Any]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(CommunicationGaps)
            res = structured_llm.invoke(f"Analyze this communication data to detect missing stakeholders, bottlenecks, or silent project members:\n\n{data}")
            return res.model_dump()
        except Exception:
            pass
    return {
        "silent_stakeholders": ["David Kim (>72 hours)"],
        "single_points_of_failure": ["Elena Rodriguez (blocking 3 critical paths)"],
        "escalation_recommendations": ["Reassign David Kim's blockers to available PMs"]
    }

def generate_daily_brief(state) -> Dict[str, Any]:
    # This relies on previously extracted components in the state
    return {
        "top_priorities": state.get("recommendations", [])[:1],
        "emerging_risks": state.get("predicted_risks", [])[:1],
        "important_decisions": state.get("decision_options", [])[:1],
        "critical_blockers": state.get("stakeholder_map", {}).get("single_points_of_failure", []),
        "recommended_actions": state.get("recommendations", [])
    }

def predict_risks(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(RiskPredictions)
            res = structured_llm.invoke(f"Predict emerging project or operational risks using these communication patterns and missed deadlines:\n\n{data}")
            return [item.model_dump() for item in res.items]
        except Exception:
            pass
    return [{
        "risk_probability": "85%",
        "severity": "Critical",
        "recommended_mitigation": "Hold emergency sync with Compliance to unblock Orion audit."
    }]

def analyze_stakeholder_sentiment(data) -> Dict[str, Any]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(SentimentAnalysis)
            res = structured_llm.invoke(f"Measure organizational health and team morale through the communication sentiment in this data:\n\n{data}")
            return res.model_dump()
        except Exception:
            pass
    return {
        "team_morale_score": 72,
        "executive_confidence_score": 88,
        "frustration_indicators": ["Elevated email volume around Project Phoenix deadlines"]
    }

def reconstruct_decision_timeline(decision_id, data) -> Dict[str, Any]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(DecisionTimeline)
            res = structured_llm.invoke(f"Rebuild the timeline, stakeholders, and approval chain for decision {decision_id} using this data:\n\n{data}")
            return res.model_dump()
        except Exception:
            pass
    return {
        "timeline": [
            {"event": "Requirements Gathering", "date": "2026-02-10"},
            {"event": "Vendor Pitch", "date": "2026-02-28"},
            {"event": "Final Approval", "date": "2026-03-10"}
        ],
        "stakeholders_involved": ["Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "James Wilson"],
        "supporting_documents": ["RFP_v2.docx", "Vendor_Comparison.xlsx"],
        "approval_chain": "Elena Rodriguez -> James Wilson -> Sarah Chen"
    }

def generate_recommendations(data) -> List[Dict[str, Any]]:
    if use_real_ai and llm:
        try:
            structured_llm = llm.with_structured_output(Recommendations)
            res = structured_llm.invoke(f"Provide proactive leadership recommendations based on these signals:\n\n{data}")
            return [item.model_dump() for item in res.items]
        except Exception:
            pass
    return [
        {"action": "Escalate budget overrun risk on Project Phoenix."},
        {"action": "Schedule stakeholder alignment meeting for Orion."},
        {"action": "Reassign ownership of delayed deliverables from David Kim."},
        {"action": "Review vendor contract approval for Horizon."}
    ]

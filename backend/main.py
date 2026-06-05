from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from pydantic import BaseModel
import time

from agents.orchestrator import run_chief_iq
from mock_data import get_all_data

app = FastAPI(title="ChiefIQ API", description="AI Chief of Staff for Microsoft 365", version="1.0.0")

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

@app.get("/api/dashboard")
def get_dashboard() -> Dict[str, Any]:
    data = get_all_data()
    # Calculate mock health score based on projects
    red_projects = len([p for p in data["projects"] if p["status"] == "Red"])
    health_score = 100 - (red_projects * 15)
    
    return {
        "org_health_score": max(health_score, 0),
        "trend": "down" if red_projects > 0 else "up",
        "active_projects": len(data["projects"]),
        "risks": {"critical": len([r for r in data["risks"] if r["severity"] == "Critical"])},
        "intelligence_feed": [
            {"id": 1, "type": "risk", "message": "Project Phoenix vendor delivery delayed.", "time": "2 hours ago"},
            {"id": 2, "type": "opportunity", "message": "Cross-functional collaboration up 15% in Data team.", "time": "5 hours ago"}
        ],
        "recommendations": [
            {"action": "Escalate Project Phoenix risk to Vendor Manager", "impact": "High", "urgency": "Immediate", "owner": "Marcus Johnson"}
        ]
    }

@app.post("/api/chat")
def chat_with_chiefiq(req: ChatRequest) -> Dict[str, Any]:
    try:
        start_time = time.time()
        final_state = run_chief_iq(req.query)
        end_time = time.time()
        
        return {
            "response": final_state["executive_brief"],
            "confidence_score": final_state.get("confidence_score", 85),
            "evidence": final_state["retrieved_context"][:3], # return top 3
            "reasoning_trace": final_state["explainability_trace"],
            "execution_time_ms": int((end_time - start_time) * 1000)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/risks")
def get_risks() -> List[Dict[str, Any]]:
    return get_all_data()["risks"]

@app.get("/api/decisions")
def get_decisions() -> List[Dict[str, Any]]:
    return get_all_data()["decisions"]

@app.get("/api/stakeholders")
def get_stakeholders() -> Dict[str, Any]:
    data = get_all_data()
    # Create some mock links for the D3 graph
    links = [
        {"source": "p1", "target": "p2", "value": 5},
        {"source": "p1", "target": "p3", "value": 3},
        {"source": "p3", "target": "p5", "value": 8},
        {"source": "p4", "target": "p1", "value": 1} # P4 is silent
    ]
    return {
        "nodes": data["people"],
        "links": links
    }

@app.get("/api/projects")
def get_projects() -> List[Dict[str, Any]]:
    return get_all_data()["projects"]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

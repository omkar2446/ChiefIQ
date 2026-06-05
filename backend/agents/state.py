from typing import TypedDict, List, Dict, Any, Optional

class AgentState(TypedDict):
    messages: List[Dict[str, str]]
    user_query: str
    retrieved_context: List[Dict[str, Any]]
    synthesized_graph: Dict[str, Any]
    identified_risks: List[Dict[str, Any]]
    predicted_risks: List[Dict[str, Any]]
    decision_options: List[Dict[str, Any]]
    action_items: List[Dict[str, Any]]
    meeting_summaries: List[Dict[str, Any]]
    stakeholder_map: Dict[str, Any]
    sentiment_scores: Dict[str, Any]
    recommendations: List[Dict[str, Any]]
    executive_brief: str
    daily_brief: Dict[str, Any]
    explainability_trace: List[Dict[str, Any]]
    confidence_score: int

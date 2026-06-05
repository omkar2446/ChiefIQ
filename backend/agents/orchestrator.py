from langgraph.graph import StateGraph, END
from .state import AgentState
from .nodes import (
    knowledge_retrieval_agent,
    context_synthesis_agent,
    risk_intelligence_agent,
    decision_intelligence_agent,
    stakeholder_mapping_agent,
    recommendation_agent,
    executive_brief_agent
)

def create_orchestrator():
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("knowledge_retrieval", knowledge_retrieval_agent)
    workflow.add_node("context_synthesis", context_synthesis_agent)
    
    # Parallel agents (simulated by sequential execution in local demo graph, 
    # but logically parallel conceptually)
    workflow.add_node("risk_intelligence", risk_intelligence_agent)
    workflow.add_node("decision_intelligence", decision_intelligence_agent)
    workflow.add_node("stakeholder_mapping", stakeholder_mapping_agent)
    
    workflow.add_node("recommendation", recommendation_agent)
    workflow.add_node("executive_brief", executive_brief_agent)
    
    # Set entry point
    workflow.set_entry_point("knowledge_retrieval")
    
    # Build edges
    workflow.add_edge("knowledge_retrieval", "context_synthesis")
    
    # From context to parallel analysis
    workflow.add_edge("context_synthesis", "risk_intelligence")
    workflow.add_edge("risk_intelligence", "decision_intelligence")
    workflow.add_edge("decision_intelligence", "stakeholder_mapping")
    
    # Gather to recommendation
    workflow.add_edge("stakeholder_mapping", "recommendation")
    workflow.add_edge("recommendation", "executive_brief")
    workflow.add_edge("executive_brief", END)
    
    return workflow.compile()

def run_chief_iq(query: str):
    app = create_orchestrator()
    initial_state = AgentState(
        messages=[],
        user_query=query,
        retrieved_context=[],
        synthesized_graph={},
        identified_risks=[],
        decision_options=[],
        stakeholder_map={},
        recommendations=[],
        executive_brief="",
        explainability_trace=[],
        confidence_score=0
    )
    final_state = app.invoke(initial_state)
    return final_state

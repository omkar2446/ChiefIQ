import time
from .state import AgentState
from mock_data import get_all_data
from .intelligence import (
    extract_decisions,
    extract_action_items,
    generate_priorities,
    analyze_meetings,
    detect_communication_gaps,
    generate_daily_brief,
    predict_risks,
    analyze_stakeholder_sentiment,
    reconstruct_decision_timeline,
    generate_recommendations,
    llm,
    use_real_ai
)

def knowledge_retrieval_agent(state: AgentState) -> AgentState:
    print("Agent: Knowledge Retrieval running...")
    data = get_all_data()
    # Populate initial context from graph signals
    state["retrieved_context"] = data["emails"] + data["risks"]
    state["explainability_trace"].append({"agent": "Knowledge Retrieval", "action": "Searched Graph API (Emails, Teams, Transcripts)", "timestamp": time.time()})
    return state

def context_synthesis_agent(state: AgentState) -> AgentState:
    print("Agent: Context Synthesis running...")
    data = get_all_data()
    # Leverage intelligence functions to build context
    state["action_items"] = extract_action_items(data)
    state["meeting_summaries"] = analyze_meetings(data)
    state["sentiment_scores"] = analyze_stakeholder_sentiment(data)
    
    state["synthesized_graph"] = {"entities": ["Project Phoenix", "Vendor Delivery", "Delay"], "relations": []}
    state["explainability_trace"].append({"agent": "Context Synthesis", "action": "Built knowledge graph and extracted action items/sentiment", "timestamp": time.time()})
    return state

def risk_intelligence_agent(state: AgentState) -> AgentState:
    print("Agent: Risk Intelligence running...")
    data = get_all_data()
    state["identified_risks"] = [r for r in data["risks"] if r["severity"] == "Critical"]
    state["predicted_risks"] = predict_risks(data)
    state["explainability_trace"].append({"agent": "Risk Intelligence", "action": "Pattern matched current risks and predicted emerging risks", "timestamp": time.time()})
    return state

def decision_intelligence_agent(state: AgentState) -> AgentState:
    print("Agent: Decision Intelligence running...")
    data = get_all_data()
    state["decision_options"] = extract_decisions(data)
    # Reconstruct timeline for the first decision as a trace example
    if state["decision_options"]:
        timeline = reconstruct_decision_timeline("dec_1", data)
        state["explainability_trace"].append({"agent": "Decision Intelligence", "action": f"Reconstructed decision trace for {state['decision_options'][0]['title']}", "timestamp": time.time()})
    return state

def stakeholder_mapping_agent(state: AgentState) -> AgentState:
    print("Agent: Stakeholder Mapping running...")
    data = get_all_data()
    state["stakeholder_map"] = detect_communication_gaps(data)
    state["explainability_trace"].append({"agent": "Stakeholder Mapping", "action": "Mapped ownership, silent stakeholders, and communication bottlenecks", "timestamp": time.time()})
    return state

def recommendation_agent(state: AgentState) -> AgentState:
    print("Agent: Recommendation running...")
    data = get_all_data()
    priorities = generate_priorities(data)
    recs = generate_recommendations(data)
    state["recommendations"] = recs
    state["confidence_score"] = 92
    state["explainability_trace"].append({"agent": "Recommendation", "action": "Ranked priorities and generated actionable leadership recommendations", "timestamp": time.time()})
    return state

def executive_brief_agent(state: AgentState) -> AgentState:
    print("Agent: Executive Brief running...")
    
    # Generate the comprehensive daily brief
    state["daily_brief"] = generate_daily_brief(state)
    
    query = state.get("user_query", "")
    response = ""
    
    if use_real_ai and llm:
        try:
            context_str = f"Decisions: {state.get('decision_options')}\nPredicted Risks: {state.get('predicted_risks')}\nRecommendations: {state.get('recommendations')}"
            prompt = f"You are ChiefIQ, an elite AI Chief of Staff. Using the following extracted organizational context:\n\n{context_str}\n\nAnswer the executive's query: '{query}'. Provide a concise, professional, and actionable response formatted in Markdown."
            res = llm.invoke(prompt)
            response = res.content
        except Exception as e:
            print(f"LLM Generation failed: {e}")
            response = "Error generating response via Gemini. Please verify your API key limits."
    else:
        # Fallback simulation
        if "risk" in query.lower():
            response = f"Based on organizational signals, there is an **85% probability** of a critical delay. {state['predicted_risks'][0]['recommended_mitigation']}"
        elif "decision" in query.lower():
            response = f"The {state['decision_options'][0]['title']} decision was approved on {state['decision_options'][0]['date']}."
        else:
            response = f"I have compiled your daily brief. Top priority: {state['recommendations'][0]['action']}"
        
    state["executive_brief"] = response
    state["explainability_trace"].append({
        "agent": "Executive Brief", 
        "action": "Generated conversational response via Gemini" if use_real_ai else "Formatted simulated response", 
        "timestamp": time.time()
    })
    return state

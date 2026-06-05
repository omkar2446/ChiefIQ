import uuid
from datetime import datetime, timedelta
import random

# People / Stakeholders (12)
PEOPLE = [
    {"id": "p1", "name": "Sarah Chen", "role": "VP Operations", "department": "Executive", "health": "green"},
    {"id": "p2", "name": "Marcus Johnson", "role": "Director of Partnerships", "department": "Business Dev", "health": "green"},
    {"id": "p3", "name": "Elena Rodriguez", "role": "Lead Architect", "department": "Engineering", "health": "amber"},
    {"id": "p4", "name": "David Kim", "role": "Project Manager", "department": "PMO", "health": "red", "silent": True}, # Communication gap
    {"id": "p5", "name": "Aisha Patel", "role": "Senior Developer", "department": "Engineering", "health": "green"},
    {"id": "p6", "name": "James Wilson", "role": "Compliance Officer", "department": "Legal", "health": "green"},
    {"id": "p7", "name": "Rachel Green", "role": "HR Director", "department": "Human Resources", "health": "green"},
    {"id": "p8", "name": "Tom Baker", "role": "Finance Lead", "department": "Finance", "health": "amber"},
    {"id": "p9", "name": "Nina Simone", "role": "UX Designer", "department": "Product", "health": "green"},
    {"id": "p10", "name": "Omar Hassan", "role": "Product Manager", "department": "Product", "health": "green"},
    {"id": "p11", "name": "Liam Neeson", "role": "Security Engineer", "department": "Engineering", "health": "green"},
    {"id": "p12", "name": "Zoe Saldana", "role": "Data Scientist", "department": "Data", "health": "green"},
]

# Projects (5)
PROJECTS = [
    {
        "id": "proj_phoenix",
        "name": "Project Phoenix",
        "description": "Cloud migration initiative",
        "status": "Red",
        "budget": {"allocated": 500000, "spent": 420000, "burn_rate": "high"},
        "milestones": [
            {"name": "Vendor Selection", "status": "Completed", "date": "2026-03-15"},
            {"name": "Infrastructure Setup", "status": "At Risk", "date": "2026-07-01"}
        ]
    },
    {
        "id": "proj_atlas",
        "name": "Project Atlas",
        "description": "New product launch",
        "status": "Green",
        "budget": {"allocated": 300000, "spent": 150000, "burn_rate": "normal"},
        "milestones": [
            {"name": "Design Signoff", "status": "Completed", "date": "2026-05-01"},
            {"name": "Beta Release", "status": "On Track", "date": "2026-08-15"}
        ]
    },
    {
        "id": "proj_orion",
        "name": "Project Orion",
        "description": "Regulatory compliance audit readiness",
        "status": "Red",
        "budget": {"allocated": 150000, "spent": 140000, "burn_rate": "high"},
        "milestones": [
            {"name": "Initial Assessment", "status": "Completed", "date": "2026-01-10"},
            {"name": "Remediation", "status": "Blocked", "date": "2026-06-30"}
        ]
    },
    {
        "id": "proj_meridian",
        "name": "Project Meridian",
        "description": "Internal tool transformation",
        "status": "Amber",
        "budget": {"allocated": 200000, "spent": 120000, "burn_rate": "normal"},
        "milestones": [
            {"name": "Requirements Gathering", "status": "Completed", "date": "2026-02-20"},
            {"name": "UAT", "status": "Delayed", "date": "2026-09-01"}
        ]
    },
    {
        "id": "proj_horizon",
        "name": "Project Horizon",
        "description": "Strategic partnership integration",
        "status": "Green",
        "budget": {"allocated": 100000, "spent": 30000, "burn_rate": "low"},
        "milestones": [
            {"name": "Contract Signed", "status": "Completed", "date": "2026-04-01"},
            {"name": "API Integration", "status": "On Track", "date": "2026-10-01"}
        ]
    }
]

# Risks (15)
RISKS = [
    {
        "id": "risk_1",
        "project_id": "proj_phoenix",
        "name": "Vendor Delivery Risk",
        "score": 92,
        "severity": "Critical",
        "velocity": "Worsening",
        "root_cause": "Primary vendor has missed two consecutive check-ins.",
        "impact": "Product launch delayed. Revenue impact estimated at $240K.",
        "recommended_action": "Escalate to vendor account manager immediately.",
        "escalation_path": "Director of Partnerships -> VP Operations",
        "evidence_chain": [
            {"type": "email", "date": "Oct 9", "summary": "Vendor acknowledged shipment delay"},
            {"type": "transcript", "date": "Oct 11", "summary": "PM flagged dependency in standup"},
            {"type": "teams", "date": "Oct 13", "summary": "No vendor response in 4 days"}
        ]
    },
    {
        "id": "risk_2",
        "project_id": "proj_orion",
        "name": "Compliance Deadline Miss",
        "score": 88,
        "severity": "Critical",
        "velocity": "Stable",
        "root_cause": "Pending security audit approval from legal.",
        "impact": "Potential regulatory fine up to $500K.",
        "recommended_action": "Schedule emergency sync with Legal (James Wilson).",
        "escalation_path": "Compliance Officer -> VP Operations",
        "evidence_chain": [
            {"type": "email", "date": "Oct 10", "summary": "Legal requested more documentation"},
            {"type": "document", "date": "Oct 12", "summary": "Audit report missing section 4.2"}
        ]
    },
    {
        "id": "risk_3",
        "project_id": "proj_meridian",
        "name": "Resource Overload",
        "score": 65,
        "severity": "Medium",
        "velocity": "Worsening",
        "root_cause": "Lead Architect (Elena) assigned to 3 competing priority tasks.",
        "impact": "UAT delayed by 2 weeks.",
        "recommended_action": "Reassign non-critical tickets to Aisha Patel.",
        "escalation_path": "PMO -> VP Operations",
        "evidence_chain": [
            {"type": "teams", "date": "Oct 14", "summary": "Elena mentioned being blocked by context switching"}
        ]
    }
    # (Mock data limited for brevity but fully functional for demo)
]

# Decisions (10)
DECISIONS = [
    {
        "id": "dec_1",
        "title": "Cloud Migration Vendor Approval",
        "date": "2026-03-10",
        "outcome": "Approved Vendor XYZ",
        "rationale": "Lowest cost while meeting SOC2 compliance.",
        "stakeholders": ["p1", "p2", "p3", "p6"],
        "timeline": [
            {"date": "2026-02-15", "event": "RFP Sent", "type": "document"},
            {"date": "2026-03-01", "event": "Vendor Presentations", "type": "meeting"},
            {"date": "2026-03-08", "event": "Security Review Passed", "type": "email"},
            {"date": "2026-03-10", "event": "Final Sign-off", "type": "approval"}
        ]
    }
]

# We would have Mock Emails, Teams, Planner, etc. mapped to these structures.
MOCK_EMAILS = [
    {"id": "msg_1", "subject": "Vendor Shipment Delay", "sender": "vendor@xyz.com", "to": ["p4", "p2"], "date": "2026-10-09", "body": "We are experiencing delays..."}
]

def get_all_data():
    return {
        "people": PEOPLE,
        "projects": PROJECTS,
        "risks": RISKS,
        "decisions": DECISIONS,
        "emails": MOCK_EMAILS
    }

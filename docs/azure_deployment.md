# ChiefIQ - Azure Deployment Guide

This guide outlines how to deploy the ChiefIQ enterprise agent application to Microsoft Azure using cloud-native services.

## Architecture

ChiefIQ utilizes the following Azure services:
- **Azure Container Apps**: Hosting the FastAPI Python backend and the LangGraph orchestration engine.
- **Azure Static Web Apps**: Hosting the Vite + React + TypeScript frontend.
- **Azure OpenAI Service**: Providing GPT-4o capabilities for the 7-agent LangGraph system.
- **Azure AI Search**: Vector database for retrieving organizational signals (emails, docs).
- **Microsoft Graph API**: Real-time extraction of M365 data.
- **Microsoft Entra ID (Azure AD)**: Securing the application with RBAC.

## Deployment Steps (Infrastructure as Code)

We provide Bicep templates for zero-click deployment.

1. **Login to Azure:**
   ```bash
   az login
   az account set --subscription "Your-Subscription-ID"
   ```

2. **Deploy the Bicep template:**
   ```bash
   az deployment group create \
     --resource-group rg-chiefiq-prod \
     --template-file infrastructure/main.bicep \
     --parameters environmentName=prod
   ```

3. **Configure Environment Variables:**
   Ensure the following secrets are added to the deployed Azure Key Vault:
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_ENDPOINT`
   - `MICROSOFT_GRAPH_CLIENT_SECRET`

## Security & Compliance Checklist (Enterprise-Ready)
- [x] **Data Residency**: All data processed within the customer's Azure tenant.
- [x] **Zero Retention**: AI prompts and responses are not logged by OpenAI.
- [x] **Entra ID Integration**: Role-Based Access Control limits visibility (e.g., PMs only see their project data).
- [x] **Data Encryption**: TLS 1.2 in transit and AES-256 at rest via CosmosDB.

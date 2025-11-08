# HACK-MIT-Sloan

## The Zero-Click CRM: Voice- and AI-Powered Customer Relationship System

> **Hack-Nation's Global AI Hackathon** | Track: VC Big Bets | Nov 8-9, 2025  
> In collaboration with **MIT Sloan AI Club**

## 🎯 Challenge Overview

Traditional CRM systems like HubSpot and Salesforce require extensive manual input—typing meeting notes, updating contact fields, logging calls, and filling forms. This manual effort interrupts real work and leads to incomplete or outdated CRM data.

**Our Solution:** We're building a CRM that updates itself using AI, voice, and real communication data—requiring **zero clicks** from users.

### The Vision

What if a CRM required zero clicks? What if it could listen to your emails, WhatsApp voice notes, Zoom calls, or phone conversations—and automatically fill, update, and organize everything for you?

## ✨ Key Features

### 🤖 AI Auto-Populating CRM
Automatically extracts structured data from emails, call transcripts, and WhatsApp voice notes:
- Contact name, company, next step
- Deal value, follow-up date, notes
- Relationship insights and context

### 🎤 Voice-to-Structured-CRM Model
Converts voice memos and recorded calls into structured CRM entries without any typing:
- Real-time transcription
- Automatic field extraction
- Context-aware data organization

### 🔄 Data Freshness Engine
Keeps CRM data up to date automatically by monitoring:
- Emails and calendar invites
- Company websites and LinkedIn profiles
- News sources and social media

### 🔍 AI Search and Relationship Insights
Natural language queries enable powerful search:
- "Show me all conversations with CTOs in the last month"
- "Which deals are at risk due to no reply in 14 days?"
- "Find contacts in the healthcare industry with open opportunities"

### 🚀 Zero-Click CRM Interface
Frictionless UI where email, voice, and call data flow directly into the system:
- No dropdowns
- No manual logging
- Seamless data integration

## 🛠️ Tech Stack

### Backend
- **.NET 9.0** - RESTful API
- **ASP.NET Core** - Web framework
- **MySQL** - Database
- **Swagger/OpenAPI** - API documentation

### AI & Cloud Services
- **Google Cloud Platform** - Infrastructure
- **Vertex AI** - Model deployment and data processing
- **Gemini Pro / 1.5** - Multimodal model for email parsing, call summaries, structured data extraction
- **Gemma / Codey** - Text-based model for CRM field extraction and automation
- **Google Cloud Speech-to-Text** - Transcribe phone calls, meetings, and voice memos
- **Whisper** (deployable on Vertex AI) - Alternative speech-to-text processing
- **Vertex AI Matching Engine** - Vector-based semantic search for CRM contacts and interactions
- **BigQuery + Cloud Functions** - Store structured contact data and automate updates

### Development Tools
- **ngrok** - Public API exposure for testing
- **DBeaver** - Database management

## 🎯 Evaluation Criteria

Our solution addresses the following evaluation criteria:

- ✅ **Automation Accuracy**: System reliably converts emails, calls, and voice messages into structured CRM entries
- ✅ **Use of Google AI / Vertex AI**: Strong integration with Google Cloud infrastructure, Gemini, and Vertex AI components
- ✅ **Data Freshness and Reliability**: CRM stays accurate over time without manual updates
- ✅ **Search and Intelligence Capabilities**: Natural language queries and insights about customers and deals
- ✅ **User Experience**: Significantly easier and more seamless than traditional CRMs
- ✅ **Prototype and Demonstration**: Clear data flow from communication → AI extraction → CRM field population

## 💡 Why It Matters

Almost every business depends on relationships—with customers, partners, investors, or users. Yet people avoid updating CRMs because it takes time, breaks focus, and feels like administrative work.

**A zero-click CRM flips this around:** it listens, learns, and fills itself—so humans can focus on conversations, not forms. If built well, this could:
- Eliminate hours of manual work each week
- Reduce lost deals
- Redefine how modern teams manage relationships

## 👥 Team

Verónica Zapata
Arthur Vigier
Diego Uzcátegui
Marino Caceres

Built for **Hack-Nation's Global AI Hackathon** in collaboration with **MIT Sloan AI Club**.

## 📝 License

This project is part of a hackathon submission.

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

## 📁 Project Structure

```
HACK-MIT-Sloan/
├── api/
│   └── API/
│       ├── Controllers/
│       │   └── UserController.cs      # User management endpoints
│       ├── Model/
│       │   └── User.cs                # User data model
│       ├── Program.cs                 # Application entry point
│       ├── Properties/
│       │   └── launchSettings.json    # Launch configuration
│       ├── start-ngrok.sh            # Start API with ngrok tunnel
│       ├── setup-ngrok.sh            # One-time ngrok setup
│       └── README-NGROK.md           # ngrok setup instructions
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [ngrok](https://ngrok.com/download) (for public API access)
- [DBeaver](https://dbeaver.io/) (optional, for database management)

### Database Setup

1. **Create the CRM database:**
   ```sql
   CREATE DATABASE CRM;
   ```

2. **Create the User table:**
   ```sql
   USE CRM;
   
   CREATE TABLE User (
       IdUser INT AUTO_INCREMENT PRIMARY KEY,
       Name VARCHAR(255),
       Phone VARCHAR(50),
       Company VARCHAR(255),
       Email VARCHAR(255)
   );
   ```

3. **Update connection string** in `api/API/Controllers/UserController.cs`:
   ```csharp
   private string connectionString = "Server=127.0.0.1;Port=3306;Database=CRM;Uid=root;password=YOUR_PASSWORD;";
   ```

### Running the API

#### Option 1: Local Development

```bash
cd api/API
dotnet restore
dotnet run
```

The API will be available at:
- **Local**: `http://localhost:5074`
- **Swagger UI**: `http://localhost:5074/swagger`

#### Option 2: With ngrok (Public Access)

**First-time setup:**
```bash
cd api/API
./setup-ngrok.sh
```

**Start API with ngrok:**
```bash
cd api/API
./start-ngrok.sh
```

The API will be publicly accessible at:
- **Public URL**: `https://unchalked-arboreally-chase.ngrok-free.dev`
- **Swagger UI**: `https://unchalked-arboreally-chase.ngrok-free.dev/swagger`

## 📡 API Documentation

### Base URL
- **Local**: `http://localhost:5074`
- **Public (ngrok)**: `https://unchalked-arboreally-chase.ngrok-free.dev`

### Endpoints

#### Get All Users
```http
GET /User
```

**Response:**
```json
[
  {
    "idUser": 1,
    "name": "John Doe",
    "phone": "+1 555-0123",
    "company": "Acme Corp",
    "email": "john.doe@acme.com"
  }
]
```

#### Create User
```http
POST /User
Content-Type: application/json

{
  "name": "Jane Smith",
  "phone": "+1 555-0456",
  "company": "Tech Inc",
  "email": "jane.smith@tech.com"
}
```

**Response:** `204 No Content`

### Interactive API Documentation

Visit `/swagger` for interactive API documentation and testing.

## 🎯 Evaluation Criteria

Our solution addresses the following evaluation criteria:

- ✅ **Automation Accuracy**: System reliably converts emails, calls, and voice messages into structured CRM entries
- ✅ **Use of Google AI / Vertex AI**: Strong integration with Google Cloud infrastructure, Gemini, and Vertex AI components
- ✅ **Data Freshness and Reliability**: CRM stays accurate over time without manual updates
- ✅ **Search and Intelligence Capabilities**: Natural language queries and insights about customers and deals
- ✅ **User Experience**: Significantly easier and more seamless than traditional CRMs
- ✅ **Prototype and Demonstration**: Clear data flow from communication → AI extraction → CRM field population

## 📚 Resources & Data Sources

### Example Datasets
- **Emails**: [Enron Email Dataset](https://www.cs.cmu.edu/~enron/)
- **Meeting/Call Transcripts**: [AMI Meeting Corpus](https://groups.inf.ed.ac.uk/ami/corpus/)
- **Voice Notes**: 
  - [VoxCeleb Speech Dataset](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/)
  - [Mozilla Common Voice](https://commonvoice.mozilla.org/)
- **CRM-like Datasets**: [Kaggle CRM Analytics Dataset](https://www.kaggle.com/datasets/atharvaingle/customer-relationship-management)
- **Public Contact Data**: LinkedIn, Crunchbase, email signatures

### Google Cloud Resources
- [Vertex AI Generative AI](https://cloud.google.com/vertex-ai/generative-ai)
- [Vertex AI Model Garden](https://cloud.google.com/vertex-ai/generative-ai/model-garden)
- [Google Cloud Speech-to-Text](https://cloud.google.com/speech-to-text)
- [Vertex AI Matching Engine](https://cloud.google.com/vertex-ai/matching-engine)
- [BigQuery](https://cloud.google.com/bigquery)
- [OpenAI Whisper](https://github.com/openai/whisper)

## 💡 Why It Matters

Almost every business depends on relationships—with customers, partners, investors, or users. Yet people avoid updating CRMs because it takes time, breaks focus, and feels like administrative work.

**A zero-click CRM flips this around:** it listens, learns, and fills itself—so humans can focus on conversations, not forms. If built well, this could:
- Eliminate hours of manual work each week
- Reduce lost deals
- Redefine how modern teams manage relationships

## 👥 Team

Built for **Hack-Nation's Global AI Hackathon** in collaboration with **MIT Sloan AI Club**.

**Organizing Team:** Linn Bieske, Kai Wiederhold, Lisa Sklyarova, Nico Fröhlich, David Plügge

## 📝 License

This project is part of a hackathon submission.

## 🔗 Links

- **Repository**: [https://github.com/vero0996/HACK-MIT-Sloan](https://github.com/vero0996/HACK-MIT-Sloan)
- **Public API**: [https://unchalked-arboreally-chase.ngrok-free.dev](https://unchalked-arboreally-chase.ngrok-free.dev)
- **Swagger UI**: [https://unchalked-arboreally-chase.ngrok-free.dev/swagger](https://unchalked-arboreally-chase.ngrok-free.dev/swagger)

---

**Built with ❤️ for the Hack-Nation Global AI Hackathon 2025**

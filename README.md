# 📦 Noble Amazon Nova AI Hackathon Project

> AI-powered automation platform built with **Amazon Nova models** that integrates external services like **Google Drive and Google Calendar** to enable intelligent task execution through natural language commands.

---

# 🚀 Overview

This project demonstrates how **Amazon Nova AI models** can be used to build an intelligent assistant capable of interacting with external services such as Google Drive and Google Calendar using API access tokens.

The system allows users to issue natural language instructions, which are interpreted by the Nova model and translated into automated actions like:

* Creating or listing Google Drive files
* Managing folders
* Scheduling events in Google Calendar
* Automating repetitive productivity workflows

The project was developed as part of an **Amazon Nova AI Hackathon** to showcase the power of Nova models for **tool-augmented AI automation**.

---

# 🎯 Problem Statement

Modern productivity workflows require interacting with multiple cloud services. Manually switching between applications like Google Drive and Google Calendar is inefficient and time-consuming.

Developers need a way to:

* Automate cloud service interactions
* Use natural language instead of manual API calls
* Build extensible AI assistants capable of executing tasks

---

# 💡 Solution

This project builds an **AI-driven automation layer** powered by **Amazon Nova 2 Lite** that:

1. Accepts natural language instructions
2. Uses Nova reasoning to determine the user's intent
3. Converts instructions into structured API calls
4. Executes operations on Google services

Example command:

```
Read a file from Google Drive called Hackathon Docs
```

Nova interprets the request and automatically calls the Google Drive API to perform the action.

---

# 🧠 Key Features

### 🤖 AI-Powered Task Understanding

Uses **Amazon Nova 2 Lite Converse API** to understand natural language commands.

### ☁️ Google Service Integration

Supports integration with:

* Google Drive
* Google Calendar

### 🔑 Secure API Access

Uses **Google OAuth access tokens** to authenticate requests.

### 🧩 Modular Architecture

The system is designed so new services can easily be added.

Example future integrations:

* Slack
* Notion
* GitHub
* Email automation

### ⚡ Automated Workflow Execution

Transforms AI outputs into executable service API requests.

---

# 🏗️ Architecture

```
User Input
   │
   ▼
Amazon Nova 2 Lite (Converse API)
   │
   ▼
Intent Parser / Tool Selector
   │
   ├── Google Drive API
   │
   └── Google Calendar API
   │
   ▼
Action Execution
```

### Flow

1. User enters natural language instruction
2. Nova interprets the command
3. System determines the appropriate service
4. API call is constructed and executed
5. Result is returned to the user

---


# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/somuthegamer49/noble_amazon_nova_ai_hackathon.git

cd noble_amazon_nova_ai_hackathon
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```
AWS_ACCESS_KEY="YOUR_ACCESS_KEY"
AWS_SECRET_KEY="YOUR_SECRET_KEY"
AWS_REGION=us-east-1
AWS_MODEL_ID=us.amazon.nova-2-lite-v1:0
```

---

# ▶️ Running the Project

```bash
python app.py
```

Example prompt:

```
Create a meeting in Google Calendar tomorrow at 10 AM titled AI Hackathon Sync
```

Expected result:

```
Event successfully created in Google Calendar.
```

---

# 🧪 Example Use Cases

### Google Drive

* Read files
* Get insights

Example:

```
List all files inside my "Hackathon" folder
```

---

### Google Calendar

* Schedule meetings
* List upcoming events

Example:

```
Schedule a meeting tomorrow at 5 PM with the title "Project Discussion"
```

---

# 🔐 Security Considerations

* Access tokens are never exposed to the model output
* Sensitive credentials are stored in environment variables
* API calls are validated before execution

---

# 🌍 Future Improvements

Possible improvements to expand the system:

* Multi-tool orchestration
* Voice assistant integration
* Support for Slack, Notion, GitHub APIs
* Persistent AI memory
* Workflow chaining

Example:

```
Create a meeting and store the agenda in Google Drive
```

---

# 🏆 Hackathon Context

This project was built for the **Amazon Nova AI Hackathon** to demonstrate:

* Tool-augmented AI
* AI-driven workflow automation
* Integration between LLMs and external services

---

# 🤝 Contributing

Contributions are welcome!

Steps:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---


# 👨‍💻 Author

**Somdutt Acharya**

GitHub: https://github.com/somuthegamer49
LinkedIn: https://www.linkedin.com/in/somdutt-acharya-29783542/
YouTube: https://www.youtube.com/@somduttacharya7110

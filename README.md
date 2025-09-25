# 🔧 Lectro Backend – API & AI Engine for YouTube Teaching Assistant  

Lectro Backend powers **Lectro Web** by providing APIs for AI-driven learning features.  
It handles **video transcription, AI prompt execution, JSON parsing, and structured API routes**, enabling the frontend to generate **summaries, notes, flashcards, quizzes, and chatbot responses**.  

---

## ✨ Features  

- 🎙️ **Transcription Service** – Converts YouTube/video audio into text.  
- 🤖 **AI Integration** – Connects to LLM APIs (OpenAI or compatible) for learning features.  
- 📦 **Reusable Utilities** – JSON parsing, AI prompt handling, error management.  
- 🌐 **REST API** – Clean API routes for easy frontend consumption.  
- 📝 **TypeScript-first** – Strongly typed backend code with compiled JavaScript (`dist`).  

---

## 🛠️ Tech Stack  

- 🟩 **Node.js + Express** – RESTful API server  
- 🌀 **TypeScript** – Safer development with type checking  
- 🤖 **AI SDK (OpenAI or similar)** – Prompt-based content generation  
- 🎙️ **Speech-to-Text** – Video/audio transcription utilities  

---

## 📂 Project Structure  
Lectro-backend\
├── src\
│ ├── controller\
│ │ └── app\
│ │ └── aiController.ts # Handles AI requests\
│ ├── routes\
│ │ ├── app/aiRouter.ts # Routes for AI services\
│ │ └── v1/index.ts # API versioning\
│ ├── utils # Helper functions\
│ │ ├── parseJson.ts\
│ │ ├── transcribe.ts\
│ │ └── useAi.ts\
│ ├── static/prompts.ts # Predefined AI prompts\
│ └── index.ts # Entry point\
├── dist # Compiled JS output\
├── package.json\
├── tsconfig.json\
└── pnpm-lock.yaml / package-lock.json\


---

## ⚙️ Installation & Setup  

1️⃣ **Clone the repo**  
```bash
git clone https://github.com/your-username/Lectro-backend.git
cd Lectro-backend
```



2️⃣ **Install dependencies**
```bash
npm install   # or pnpm install
```

3️⃣ **Setup environment variables**
```env
Create a .env file in the root:

PORT=5000
OPENAI_API_KEY=your_openai_api_key
```
4️⃣ **Run the dev server**
```bash
npm run dev
```
5️⃣ **Build for production**
```bash
npm run build
npm start
```
📖 **API Endpoints**
🔹 Base URL
```bash
http://localhost:5000/api/v1
```


## **🔹Routes**  

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/app/summary`    | Generate video summary               |
| POST   | `/app/notes`      | Extract structured notes             |
| POST   | `/app/flashcards` | Create flashcards from transcript    |
| POST   | `/app/quiz`       | Generate quiz questions              |
| POST   | `/app/chat`       | Ask questions about video content    |

## 📜 **License**

MIT License © 2025 Lectro


---
```pgsql
⚡ Do you want me to also create a **combined root-level README** that explains the project as a whole (with both backend & frontend sections), or do you want to keep **separate READMEs only**?
```

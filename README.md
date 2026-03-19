# FitScore AI

### AI Resume–Job Intelligence Platform

FitScore AI is a full-stack AI-powered system that evaluates how well a candidate's resume aligns with a job description using semantic understanding and structured skill analysis.

It goes beyond keyword matching by leveraging transformer-based embeddings to deliver transparent, explainable scoring and actionable insights.

<img width="1262" height="673" alt="image" src="https://github.com/user-attachments/assets/1bb31105-c663-4f7b-933d-6c68b4227c97" />

---

## Overview

FitScore AI analyzes resumes against job descriptions and generates a comprehensive evaluation including:

* Match Score
* Semantic Similarity
* Skill Coverage
* Skill Gap Analysis
* Role Alignment Suggestions

The platform is designed to help candidates strategically improve their resumes and maximize job fit.

---

## Key Features

### Contextual Resume Matching

Uses transformer-based sentence embeddings to measure semantic similarity between resume and job description.

### Skill Gap Detection

Extracts and compares skills from both inputs to identify missing and matched skills.

### Transparent Scoring Model

Weighted scoring system:

* 60% Semantic Similarity
* 40% Skill Coverage

### Actionable Insights

Provides structured feedback to improve resume alignment with target roles.

### Dashboard Analytics

Visual representation of:

* Match score
* Skill distribution
* Career signals
* Historical analysis

<img width="1263" height="531" alt="image" src="https://github.com/user-attachments/assets/bb5a0679-be78-4816-ba32-36186b538691" />


---

## System Architecture

### Frontend

* React (TypeScript)
* Vite
* Tailwind CSS

### Backend

* FastAPI
* Python

### AI / NLP

* Sentence Transformers (all-MiniLM-L6-v2)
* Cosine Similarity

### Database

* SQLite (users.db)

---

## Project Structure

```
fitscore-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── sections/
│   │   └── App.tsx
│   │
│   ├── index.html
│   └── package.json
│
├── ml-backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── database.py
│   ├── requirements.txt
│   └── users.db
│
└── README.md
```

---

## How It Works

1. User inputs resume and job description
2. Text is converted into embeddings using transformer models
3. Semantic similarity is calculated
4. Skills are extracted and compared
5. Final score is computed using weighted formula
6. Insights and recommendations are generated

<img width="1280" height="512" alt="image" src="https://github.com/user-attachments/assets/e2d6555e-82f1-4fbf-bcf6-c11f0609c3e7" />

---

## Scoring Formula

```
FitScore = (0.6 × Semantic Similarity) + (0.4 × Skill Coverage)
```

---

## Installation

### Clone the repository

```
git clone https://github.com/your-username/fitscore-ai.git
cd fitscore-ai
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

### Backend Setup

```
cd ml-backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

---

## Environment Variables

Frontend `.env`:

```
VITE_API_URL=http://localhost:8000
```

---

## API Integration

Frontend communicates with backend via REST APIs defined in:

```
src/lib/api.ts
```

Ensure correct base URL is configured for development and production.

---



---

## Screenshots

<img width="1355" height="680" alt="image" src="https://github.com/user-attachments/assets/2a17e3cb-c866-4a65-a68b-eae5f85b404d" />


<img width="1293" height="609" alt="image" src="https://github.com/user-attachments/assets/d281fbd6-2341-42eb-8fcd-2f0dc984e0e4" />


<img width="1268" height="587" alt="image" src="https://github.com/user-attachments/assets/7c12e2b8-342c-49b8-a657-97f2914ca0e0" />


<img width="1279" height="637" alt="image" src="https://github.com/user-attachments/assets/f83de164-482c-4fb4-8031-f50e3df32691" />


<img width="1266" height="593" alt="image" src="https://github.com/user-attachments/assets/828a7e1e-d74d-4d16-a7d0-cb6a8da78baf" />


<img width="1245" height="437" alt="image" src="https://github.com/user-attachments/assets/d9aea0fd-500b-4257-a1c7-2ef91d64b28f" />


<img width="1273" height="602" alt="image" src="https://github.com/user-attachments/assets/e07945ca-4a2f-409b-8381-d01b970c3509" />


<img width="1230" height="535" alt="image" src="https://github.com/user-attachments/assets/1f04a916-1a58-4190-ad77-9be002312199" />


<img width="514" height="434" alt="image" src="https://github.com/user-attachments/assets/d799b820-154a-4075-9753-cc912afbc91b" />

---

## Future Improvements

* Advanced skill extraction using NLP pipelines
* Resume section-wise analysis
* Personalized resume recommendations
* Multi-role job matching
* Model optimization for faster inference
* Cloud database integration

---

## Author

Alfred Samuel
Final Year – Computer Science (AI & ML)

<img width="959" height="356" alt="image" src="https://github.com/user-attachments/assets/c60c9746-36b4-4a73-b431-80bccb25cbd2" />


---


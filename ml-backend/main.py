from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

from database import Base, engine, SessionLocal
from models import User, Analysis
from schemas import SignupRequest, SigninRequest
from auth import hash_password, verify_password, create_token, get_email_from_token

# ------------------ APP ------------------
app = FastAPI()

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ DATABASE ------------------
Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ------------------ ML MODEL ------------------
model = SentenceTransformer("all-MiniLM-L6-v2")

TECH_SKILLS = [
    "React", "Next.js", "Angular", "Vue",
    "JavaScript", "TypeScript", "HTML", "CSS",
    "Node.js", "Express", "FastAPI", "Django",
    "SQL", "MySQL", "PostgreSQL", "MongoDB",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP",
    "Python", "Machine Learning", "Deep Learning",
    "NLP", "TensorFlow", "PyTorch", "Scikit-learn",
    "REST API", "Git"
]

skill_embeddings = model.encode(TECH_SKILLS)


# ------------------ AUTH ROUTES ------------------
@app.post("/api/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_token({"sub": user.email})

    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


@app.post("/api/signin")
def signin(data: SigninRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user.email})

    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
        },
    }


@app.get("/api/profile")
def profile(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.split(" ")[1]
    email = get_email_from_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
    }


# ------------------ ANALYZE ROUTE ------------------
@app.post("/analyze")
def analyze_resume_vs_jd(
    data: dict,
    authorization: str = Header(None),
    db: Session = Depends(get_db),
):
    resume_text = data.get("resume_text", "")
    job_description = data.get("job_description", "")

    if not resume_text or not job_description:
        raise HTTPException(status_code=400, detail="Invalid input")

    resume_lower = resume_text.lower()
    jd_lower = job_description.lower()

    # ---------- 1️⃣ Semantic Similarity ----------
    resume_embedding = model.encode([resume_text])
    jd_embedding = model.encode([job_description])

    semantic_score = cosine_similarity(
        resume_embedding, jd_embedding
    )[0][0]

    # ---------- 2️⃣ Detect JD Skills ----------
    jd_relevant_skills = []

    for skill in TECH_SKILLS:
        if skill.lower() in jd_lower:
            jd_relevant_skills.append(skill)

    # fallback if no direct match
    if not jd_relevant_skills:
        jd_skill_similarities = cosine_similarity(
            jd_embedding, skill_embeddings
        )[0]

        for skill, sim in zip(TECH_SKILLS, jd_skill_similarities):
            if sim > 0.45:
                jd_relevant_skills.append(skill)

    # ---------- 3️⃣ Resume Coverage ----------
    skills_in_resume = []
    missing_skills = []

    for skill in jd_relevant_skills:
        if skill.lower() in resume_lower:
            skills_in_resume.append(skill)
        else:
            missing_skills.append(skill)

    # ---------- 4️⃣ Scoring ----------
    if jd_relevant_skills:
        skill_coverage_ratio = len(skills_in_resume) / len(jd_relevant_skills)
    else:
        skill_coverage_ratio = 0

    semantic_percent = int(semantic_score * 100)
    skill_coverage_percent = int(skill_coverage_ratio * 100)

    final_score = int(
        (semantic_score * 0.6 + skill_coverage_ratio * 0.4) * 100
    )

    # ---------- Save Analysis ----------
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        email = get_email_from_token(token)

        if email:
            user = db.query(User).filter(User.email == email).first()
            if user:
                new_analysis = Analysis(
                    user_id=user.id,
                    match_score=final_score,
                    semantic_score=semantic_percent,
                    skill_coverage=skill_coverage_percent,
                    skills_in_resume=skills_in_resume,
                    missing_skills=missing_skills,
                )

                db.add(new_analysis)
                db.commit()
                db.refresh(new_analysis)

    return {
        "match_score": final_score,
        "semantic_score": semantic_percent,
        "skill_coverage": skill_coverage_percent,
        "skills_in_resume": skills_in_resume,
        "missing_skills": missing_skills,
        "recommendations": [
            f"Consider strengthening your experience with {s}"
            for s in missing_skills[:5]
        ],
    }


# ------------------ HISTORY ROUTE ------------------
@app.get("/api/history")
def get_analysis_history(
    authorization: str = Header(None),
    db: Session = Depends(get_db),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")

    token = authorization.split(" ")[1]
    email = get_email_from_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    history = (
        db.query(Analysis)
        .filter(Analysis.user_id == user.id)
        .order_by(Analysis.created_at.desc())
        .all()
    )

    return [
        {
            "id": a.id,
            "match_score": a.match_score,
            "semantic_score": a.semantic_score,
            "skill_coverage": a.skill_coverage,
            "skills_in_resume": a.skills_in_resume,
            "missing_skills": a.missing_skills,
            "created_at": a.created_at,
        }
        for a in history
    ]
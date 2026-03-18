// mock/server.js
// Express mock server with CORS enabled
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const app = express()

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}))

app.use(express.json())

// ❗ IMPORTANT FIX — remove broken wildcard route
// express v5 no longer accepts '*' or '/api/*'
// CORS middleware already handles OPTIONS automatically
// so we DO NOT need app.options(...) at all.

// --------------------------------------------------------------

const DB_PATH = path.join(__dirname, 'db.json')

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    const initial = {
      users: [],
      profile: {
        skills: ['React','Python','SQL'],
        progress: 72,
        goals: 'Improve your skills to reach 90%',
        matchedRoles: ['Frontend','ML','Data']
      }
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2))
    return initial
  }
}

function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

function makeToken() {
  return 'mock-' + crypto.randomBytes(8).toString('hex') + '-' + Date.now()
}

// ---------------------- SIGNUP ----------------------
app.post('/api/signup', (req, res) => {
  const { name = '', email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email & password required' })
  }

  const db = readDB()
  const exists = db.users.find(u => u.email === String(email).toLowerCase())
  if (exists) {
    return res.status(409).json({ error: 'User already exists' })
  }

  const id = db.users.length ? (Math.max(...db.users.map(u => u.id || 0)) + 1) : 1
  const user = { id, name, email: String(email).toLowerCase(), password }
  db.users.push(user)
  writeDB(db)

  const token = makeToken()
  user._lastToken = token
  writeDB(db)

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

// ---------------------- SIGNIN ----------------------
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'email & password required' })

  const db = readDB()
  const user = db.users.find(u =>
    u.email === String(email).toLowerCase() &&
    u.password === password
  )

  if (!user) return res.status(401).json({ error: 'Invalid credentials' })

  const token = makeToken()
  user._lastToken = token
  writeDB(db)

  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

// ---------------------- PROFILE (GET) ----------------------
app.get('/api/profile', (req, res) => {
  const db = readDB()
  res.json(db.profile)
})

// Resume upload (stores only file metadata)
app.post('/api/resume', (req, res) => {
  if (!req.headers['content-type']?.includes('multipart/form-data')) {
    return res.status(400).json({ error: 'Invalid upload format' })
  }

  // Mock behavior: pretend file is saved
  const db = readDB()
  db.profile.lastResume = {
    uploadedAt: Date.now(),
    fileName: 'resume.pdf',
    note: 'Mock uploaded resume (file not stored physically)',
  }
  writeDB(db)

  res.json({ success: true, message: "Resume processed", profile: db.profile })
})

// mock/server.js  <-- add/append these lines near other API endpoints

// Simple JD analysis mock endpoint
app.post('/api/jd', express.json(), (req, res) => {
  // Accept either { text: "..."} or { fileUrl: "..." } in the body
  const { text, fileUrl } = req.body || {}

  // Artificial delay to simulate processing
  const t0 = Date.now()

  // Create a fake analysis based on presence of keywords
  const sampleText = (text || (fileUrl ? 'Sample job: frontend engineer, React, SQL, Python' : '')).toLowerCase()

  // simple-ish keyword checks
  const keywords = ['react', 'javascript', 'node', 'python', 'nlp', 'sql', 'docker', 'aws', 'ml', 'data']
  const present = keywords.filter(k => sampleText.includes(k))
  const missing = keywords.filter(k => !sampleText.includes(k))

  // score: proportion of important keywords present (naive)
  const matchScore = Math.round((present.length / keywords.length) * 100)

  // sample recommendations (mock)
  const recs = []
  if (!sampleText.includes('react')) recs.push('Learn React fundamentals (3 hands-on projects)')
  if (!sampleText.includes('python')) recs.push('Take Python basics for data/ML workflows')
  if (!sampleText.includes('sql')) recs.push('Practice SQL queries and joins')
  if (sampleText.includes('nlp')) recs.push('Advance to NLP model fine-tuning')

  // small sample matched roles
  const matchedRoles = []
  if (matchScore > 60) matchedRoles.push('Frontend')
  if (sampleText.includes('ml') || sampleText.includes('nlp') || sampleText.includes('python')) matchedRoles.push('ML / Data')
  if (sampleText.includes('sql') || sampleText.includes('postgres') || sampleText.includes('database')) matchedRoles.push('Data Engineer')

  const response = {
    summary: `Detected ${present.length} of ${keywords.length} skills — basic match ${matchScore}%`,
    matchScore,
    matchedRoles: matchedRoles.length ? matchedRoles : ['Generalist'],
    missingSkills: missing.slice(0, 6),
    recommended: recs.length ? recs : ['Complete quick skill quiz to fine-tune suggestions'],
    timeMs: Date.now() - t0,
    // echo back for debug
    debug: { present, missing, textSample: (text || '').slice(0, 200), fileUrl: fileUrl || null }
  }

  // small delay so UI shows loading
  setTimeout(() => res.json(response), 700)
})


// ---------------------- PROFILE (UPDATE) ----------------------
app.post('/api/profile', (req, res) => {
  const db = readDB()
  db.profile = Object.assign({}, db.profile, req.body || {})
  writeDB(db)
  res.json(db.profile)
})

// ---------------------- USERS (DEBUG) ----------------------
app.get('/api/users', (req, res) => {
  const db = readDB()
  const users = db.users.map(u => ({ id: u.id, name: u.name, email: u.email }))
  res.json(users)
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`)
  console.log('POST /api/signup  POST /api/signin  GET /api/profile')
})

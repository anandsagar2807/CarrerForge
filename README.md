# ResumeForge Pro

AI-powered resume builder with ATS analysis, bullet rewriting, cover letter generation, interview preparation, and a career chat assistant.

Built as a full-stack app:
- **Frontend:** React + Vite + TailwindCSS + Framer Motion
- **Backend:** Node.js + Express + MongoDB + JWT
- **AI:** OpenAI-compatible SDK (configured for **Groq** and/or **OpenRouter**) + rate limiting
- **Payments:** Stripe (optional)

---

## Key Features

### Resume Building
- **8 professional templates** (Modern, ATS-friendly, Creative, Executive, Minimalist, Tech, Compact, Professional)
- Guided resume builder experience
- Real-time preview
- Export to **PDF**

### AI Tools
- **ATS Score Checker** (resume vs job description)
  - section scoring (skills/experience/education/keywords)
  - found vs missing keywords
  - actionable improvement tips
- **AI Bullet Rewriter**
  - turns basic bullets into impact-focused achievements
- **Cover Letter Generator**
  - personalized letters from resume + job description
- **Interview Prep Generator**
  - role-specific behavioral + technical questions
- **AI Career Chat Assistant**
  - conversational guidance (no markdown formatting)

### UX / UI Improvements
- Premium UI polish (light theme direction, smooth animations)
- Enhanced templates header and layout improvements
- Fullscreen layout across pages

---

## App Routes

| Page | Route |
|------|-------|
| Home | `/` |
| Templates | `/templates` |
| Analyze (ATS + Bullet Rewriter) | `/analyze` |
| Resume Builder | `/builder` |
| Cover Letter | `/cover-letter` |
| Chat Assistant | `/chat` |
| Interview Prep | `/interview-prep` |

---

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Rate limiting
- Stripe (optional)

---

## Getting Started (Local Development)

### Prerequisites
- Node.js **18+**
- MongoDB (local or Atlas)
- npm or yarn
- AI key(s): **GROQ_API_KEY** and/or **OPENROUTER_API_KEY**

---

## Installation

### 1) Clone

```bash
git clone <your-repo-url>
cd CarrerForgePro2
```

### 2) Backend dependencies

```bash
cd server
npm install
```

### 3) Frontend dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

> Do not commit real secrets. Use `.env` locally and hosting provider dashboards in production.

### Backend (`server/.env`)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/resumeforge

# Auth
JWT_SECRET=your-super-secret-jwt-key

# CORS
CLIENT_URL=http://localhost:5173

# AI (Groq)
GROQ_API_KEY=your_groq_api_key

# AI (OpenRouter)
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=openai/gpt-3.5-turbo
OPENROUTER_FALLBACK_MODEL=anthropic/claude-2
OPENROUTER_SITE_URL=http://localhost:5173
OPENROUTER_SITE_NAME=ResumeForgePro

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_key

# Rate limiting (optional)
AI_REQUESTS_PER_MINUTE=30
AI_REQUESTS_PER_DAY=1000
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the App

### Start backend

```bash
cd server
npm run dev
```

### Start frontend

```bash
cd frontend
npm run dev
```

Open:
- Frontend: `http://localhost:5173`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/create` | Create resume |
| GET | `/api/resume/:id` | Get resume by ID |
| PUT | `/api/resume/:id` | Update resume |
| DELETE | `/api/resume/:id` | Delete resume |
| GET | `/api/resume/user/:userId` | Get user resumes |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze-ats` | ATS score analysis |
| POST | `/api/ai/rewrite-bullet` | Rewrite resume bullets |
| POST | `/api/ai/generate-cover-letter` | Generate cover letter |
| POST | `/api/ai/interview-questions` | Generate interview questions |
| POST | `/api/ai/chat` | AI chat assistant |

### Payments (Optional)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-checkout` | Stripe checkout |
| POST | `/api/payment/webhook` | Stripe webhook |

---

## Project Structure

```text
CarrerForgePro2/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   └── package.json
└── DEPLOYMENT.md
```

---

## Documentation

- `DEPLOYMENT.md` — production deployment guide (Vercel + Render/Railway + Atlas)
- `HEADER_IMPROVEMENTS.md` — header/navigation UI improvements summary
- `CHATBOT_FIXES.md` — chatbot behavior + verification steps
- `PROJECT_SUMMARY.md` / `UPDATES_SUMMARY.md` — implementation notes and delivered changes

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-change`
3. Commit: `git commit -m "feat: add my change"`
4. Push: `git push origin feature/my-change`
5. Open a Pull Request

---

## License

MIT

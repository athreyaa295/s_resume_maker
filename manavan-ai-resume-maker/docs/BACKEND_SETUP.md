# Backend Setup

The backend processes resumes and performs AI analysis.

---

## Step 1 Navigate to Backend

```bash
cd backend
```

---

## Step 2 Install Dependencies

```bash
npm install
```

---

## Step 3 Run Server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## API Endpoint

Resume Analysis Endpoint:

```
POST /analyze-resume
```

Request:

```javascript
// Form Data
resume_file
```

Response:

```json
{
  "score": 85,
  "skills": ["Python","React"],
  "missing_skills": ["Docker"],
  "ats_score": 78,
  "suggestions": ["Add project experience"]
}
```

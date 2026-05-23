# AI Resume Maker — Manavan AI

This project is a 5-step AI Resume Builder built using:

- React (Frontend)
- Node.js + Express (Backend)
- Ollama
- Llama3

The system allows users to:

1. Start with a loading page
2. Upload resume or capture photo
3. Select professional resume template
4. Answer AI resume questions
5. Generate a full resume automatically

The generated resume can be downloaded as:

- PDF
- DOCX

The entire system runs locally using Ollama Llama3.

No external AI APIs are allowed.

---

# Page Flow

Page 1 → Loading Screen  
Page 2 → Upload Resume / Take Photo  
Page 3 → Template Selection  
Page 4 → Resume Questions  
Page 5 → Resume Generator + Download

IMPORTANT

Page 5 must be the final working resume builder.

All previous pages provide inputs to the final resume.

---

# AI Usage

Llama3 performs:

- Resume text extraction
- Resume writing
- Grammar improvement
- Professional formatting

---

# Folder Structure

manavan-ai-resume-maker

frontend/
  src/
    pages/
      LoadingPage.jsx
      UploadPage.jsx
      TemplatePage.jsx
      QuestionsPage.jsx
      ResultPage.jsx

    components/
      ResumePreview.jsx
      TemplateCard.jsx
      QuestionForm.jsx

    services/
      api.js

backend/
  ai/
    llamaService.js

  resume/
    resumeGenerator.js
    templateEngine.js

templates/
  modern/
  corporate/
  minimal/
  executive/

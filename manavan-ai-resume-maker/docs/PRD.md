# Product Requirement Document (PRD)

## Product Name
Manavan AI Resume Builder

## Product Vision

Manavan AI Resume Builder is a local AI-powered system that helps users quickly generate professional resumes using AI. The system runs completely locally using Ollama with the Llama3 model and does not require any external AI APIs.

The product simplifies resume creation by guiding users through a 5-step process and automatically generating a high-quality ATS-friendly resume.

---

# Problem Statement

Many students and professionals struggle to create professional resumes. Most users do not know:

- How to structure resumes
- How to write professional descriptions
- How to make ATS-friendly resumes

Existing resume tools often require subscriptions or online AI services.

This project solves the problem by providing a **local AI-powered resume builder** that works offline using Ollama.

---

# Goals

1. Allow users to create resumes easily with AI assistance.
2. Provide professional resume templates.
3. Automatically improve resume text using AI.
4. Allow resume export in PDF and Word format.
5. Ensure the system works locally without external APIs.

---

# Target Users

Primary Users:

- College students
- Job seekers
- Fresh graduates
- Developers building resumes quickly

Secondary Users:

- Professionals updating resumes
- Internship applicants

---

# System Architecture

Frontend:
React

Backend:
Node.js + Express

AI Model:
Ollama with Llama3

Document Export:
PDF + DOCX generation

System runs locally.

---

# User Flow

Step 1  
User enters the resume builder.

Step 2  
User uploads resume or captures photo.

Step 3  
User selects a resume template.

Step 4  
User answers questions about their experience and skills.

Step 5  
AI generates the final resume.

User downloads resume as PDF or DOCX.

---

# Core Features

## 1 Loading Page

Purpose:
Introduce the product.

Display:

Manavan 001  
AI Resume Analyzer

Behavior:

- Loading animation
- Auto redirect after 3 seconds

Route:

/resume-start

---

## 2 Resume Upload Page

Users can:

- Upload resume file
- Capture resume photo
- Skip upload

Supported Formats:

- PDF
- DOCX
- JPG
- PNG

Uploaded files are processed by backend AI.

AI extracts:

- Name
- Skills
- Education
- Experience
- Projects

Route:

/resume-upload

---

## 3 Template Selection Page

User selects a resume template.

Templates available:

Modern Professional  
Corporate ATS  
Minimal Clean  
Executive Premium

Each template shows preview.

Route:

/resume-template

---

## 4 Resume Questions Page

User answers structured questions.

Sections:

Personal Information

Full Name  
Email  
Phone  
LinkedIn  
Portfolio

Education

College  
Degree  
Graduation Year  
CGPA

Skills

Technical Skills  
Tools  
Programming Languages

Experience

Internships  
Jobs  
Responsibilities

Projects

Project Name  
Description  
Technologies

Achievements

Certifications  
Awards  
Hackathons

AI improves answers into professional resume text.

Route:

/resume-questions

---

## 5 Resume Generator Page

Final page generates the complete resume.

AI uses:

Uploaded resume data  
User answers  
Selected template

Generated resume includes:

Header  
Professional Summary  
Skills  
Experience  
Projects  
Education  
Achievements

Features:

Live resume preview

Download options:

Download PDF  
Download DOCX

Route:

/resume-result

Important:

This page must work even if the user skips earlier steps.

---

# AI Integration

Model:
Llama3

Platform:
Ollama

AI Responsibilities:

Extract resume data  
Improve text grammar  
Generate professional resume descriptions

Example Prompt:

"You are a professional resume writer. Convert the provided user information into an ATS-friendly professional resume."

---

# Resume Template Engine

Resume templates stored as HTML layouts.

Examples:

modern-template.html  
corporate-template.html  
minimal-template.html  
executive-template.html

Templates contain placeholders:

{{name}}  
{{summary}}  
{{skills}}  
{{experience}}  
{{projects}}  
{{education}}

Template engine replaces placeholders with AI-generated content.

---

# Resume Export

Generated resume can be exported as:

PDF  
DOCX

Libraries:

PDF:
puppeteer

DOCX:
docx npm package

Steps:

1 Generate resume HTML
2 Convert HTML to PDF
3 Convert HTML to DOCX
4 Allow user download

---

# Non Functional Requirements

System must run locally.

No external APIs allowed.

AI must run using Ollama Llama3.

Resume generation must complete within 5 seconds.

System must support modern browsers.

---

# Success Metrics

User can generate resume within 2 minutes.

Resume downloads successfully.

AI output produces structured professional resume.

System runs fully locally.

---

# Future Improvements

AI resume scoring  
ATS compatibility checker  
Job-specific resume customization  
LinkedIn profile import  
Multiple resume versions

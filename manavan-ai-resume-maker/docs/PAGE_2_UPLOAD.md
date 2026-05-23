# Page 2 — Upload Resume / Take Photo

Route:
/resume-upload

Users must have 3 options:

1 Upload Resume
2 Take Photo
3 Skip

Supported formats:

PDF  
DOCX  
JPG  
PNG

Upload flow:

Frontend sends file to backend.

Backend uses:

Ollama Llama3

To extract:

- Name
- Skills
- Education
- Experience
- Projects

Extracted data stored in React state or session.

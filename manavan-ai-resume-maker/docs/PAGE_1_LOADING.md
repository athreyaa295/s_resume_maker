# Page 1 — Loading Page

Route:
/resume-start

Display:

Manavan 001  
AI Resume Analyzer

UI:

Full screen centered layout.

Example layout:

--------------------------------
Manavan 001
AI Resume Analyzer

Preparing AI Resume Builder...
--------------------------------

Features:

- Loading animation
- 3 second delay
- Auto redirect to upload page

React Logic:

useEffect(() => {
  setTimeout(() => {
    navigate("/resume-upload")
  },3000)
},[])

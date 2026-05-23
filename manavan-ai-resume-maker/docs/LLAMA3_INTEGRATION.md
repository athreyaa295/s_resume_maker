# Ollama Llama3 Integration

Model:

llama3

Run locally:

ollama run llama3

Node example:

POST /generate-resume

Prompt:

You are a professional resume writer.

Create a high quality ATS friendly resume from the following user data.

User Data:

{name}
{skills}
{projects}
{education}

Output must contain:

Summary  
Skills  
Experience  
Projects  
Education  
Achievements

Use bullet points.

Keep language professional.

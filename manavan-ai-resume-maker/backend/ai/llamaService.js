const axios = require('axios');

const OLLAMA_URL = 'http://localhost:11434/api/generate';

const PROMPT_TEMPLATE = `
You are a professional resume writer.
I will provide you with user details. Please format them into a professional, high-impact resume.
Focus on action verbs, quantify achievements where possible, and ensure the language is professional.

USER DATA:
{userData}

INSTRUCTIONS:
Output only valid JSON with the following keys:
{
  "summary": "Professional summary...",
  "skills": "Skill 1, Skill 2, ...",
  "experience": "HTML string for experience section",
  "projects": "HTML string for projects section",
  "education": "HTML string for education section",
  "achievements": "HTML string for achievements section"
}

Keep HTML minimal (use <div class="item">, <div class="item-header">, <ul class="bullets">, <li>).
Only return the JSON. No conversational text.
`;

const extractFromResume = async (text) => {
    try {
        const response = await axios.post(OLLAMA_URL, {
            model: "llama3",
            prompt: `Extract Name, Skills, Education, Experience, and Projects from the following resume text. Output as JSON only. 
            
            Text: ${text.substring(0, 3000)}`, // Limit text size
            stream: false,
            format: "json"
        });
        return JSON.parse(response.data.response);
    } catch (error) {
        console.error("Llama extraction error:", error);
        return {};
    }
};

const improveResume = async (userData) => {
    try {
        const prompt = PROMPT_TEMPLATE.replace('{userData}', JSON.stringify(userData, null, 2));
        const response = await axios.post(OLLAMA_URL, {
            model: "llama3",
            prompt: prompt,
            stream: false,
            format: "json"
        });
        return JSON.parse(response.data.response);
    } catch (error) {
        console.error("Llama improvement error:", error);
        return userData; // Fallback to raw data
    }
};

module.exports = {
    extractFromResume,
    improveResume
};

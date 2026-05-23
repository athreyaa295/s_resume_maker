const fs = require('fs-extra');
const path = require('path');

const templatesDir = path.join(__dirname, '../../templates');

const fillTemplate = async (templateName, data) => {
    try {
        const templatePath = path.join(templatesDir, `${templateName}-template.html`);
        let html = await fs.readFile(templatePath, 'utf8');

        // Simple placeholder replacement
        const photoHtml = data.photo ? `<img src="${data.photo}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #ccc; flex-shrink: 0;" alt="Profile Photo">` : '';

        const placeholders = {
            '{{photo_html}}': photoHtml,
            '{{name}}': data.fullName || 'Untitled Resume',
            '{{summary}}': data.summary || '',
            '{{skills}}': data.skills || '',
            '{{experience}}': data.experience || '',
            '{{projects}}': data.projects || '',
            '{{education}}': data.education || '',
            '{{achievements}}': data.achievements || '',
            '{{email}}': data.email || '',
            '{{phone}}': data.phone || '',
            '{{linkedin}}': data.linkedin || '',
            '{{portfolio}}': data.portfolio || ''
        };

        for (const [key, value] of Object.entries(placeholders)) {
            html = html.split(key).join(value);
        }

        return html;
    } catch (error) {
        console.error("Template engine error:", error);
        throw error;
    }
};

module.exports = { fillTemplate };

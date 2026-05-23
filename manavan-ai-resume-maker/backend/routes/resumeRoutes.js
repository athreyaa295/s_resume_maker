const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const llamaService = require('../ai/llamaService');
const templateEngine = require('../resume/templateEngine');
const resumeGenerator = require('../resume/resumeGenerator');

const upload = multer({ storage: multer.memoryStorage() });

// 1. Upload & Extract
router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        let text = "";
        if (req.file.mimetype === 'application/pdf') {
            const data = await pdfParse(req.file.buffer);
            text = data.text;
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const data = await mammoth.extractRawText({ buffer: req.file.buffer });
            text = data.value;
        } else {
            // For images, OCR would be needed. Placeholder for now.
            text = "Image text extraction not implemented yet.";
        }

        const extractedData = await llamaService.extractFromResume(text);
        res.json(extractedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process resume" });
    }
});

// 2. Generate Resume Content
router.post('/generate', async (req, res) => {
    try {
        const userData = req.body;
        const improvedData = await llamaService.improveResume(userData);
        // Merge AI improved content with personal info
        const finalData = { ...userData, ...improvedData };
        res.json(finalData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate resume" });
    }
});

// 3. Export PDF
router.post('/export/pdf', async (req, res) => {
    try {
        const { template, data } = req.body;
        const html = await templateEngine.fillTemplate(template, data);
        const pdfBuffer = await resumeGenerator.generatePDF(html);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Export failed");
    }
});

// 4. Export DOCX
router.post('/export/docx', async (req, res) => {
    try {
        const { data } = req.body;
        const docxBuffer = await resumeGenerator.generateDOCX(data);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', 'attachment; filename=resume.docx');
        res.send(docxBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Export failed");
    }
});

module.exports = router;

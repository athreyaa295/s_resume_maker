const puppeteer = require('puppeteer');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const fs = require('fs-extra');

const generatePDF = async (html) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    return pdf;
};

const generateDOCX = async (data) => {
    // Basic implementation of DOCX conversion
    // Ideally use a library that converts HTML to DOCX, but here we build a simple doc
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({ text: data.fullName || 'Resume', bold: true, size: 48 }),
                    ],
                }),
                new Paragraph({ text: data.summary || '' }),
                new Paragraph({ text: "SKILLS", bold: true }),
                new Paragraph({ text: data.skills || '' }),
                // Simplified for brevity - in production, parsing HTML segments would be needed
                new Paragraph({ text: "EXPERIENCE", bold: true }),
                new Paragraph({ text: "See PDF version for full formatting" }),
            ],
        }],
    });

    return await Packer.toBuffer(doc);
};

module.exports = { generatePDF, generateDOCX };

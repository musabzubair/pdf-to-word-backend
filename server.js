const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { Document, Packer, Paragraph } = require('docx');
const path = require('path');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Upload endpoint
app.post('/convert', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No PDF file uploaded');
    }

    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);

    // Create a DOCX document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(data.text)],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    // Clean up uploaded PDF
    fs.unlinkSync(file.path);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=converted.docx',
    });

    res.send(buffer);
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).send('Failed to convert PDF to Word');
  }
});

// Basic root route
app.get('/', (req, res) => {
  res.send('PDF to Word Backend is running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

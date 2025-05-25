<<<<<<< HEAD
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/converted', express.static('converted'));

const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('file'), (req, res) => {
  const inputPath = path.resolve(req.file.path);
  const outputDir = path.resolve('converted');
  const outputFile = req.file.originalname.replace(/\.pdf$/i, '.docx');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const cmd = `libreoffice --headless --convert-to docx --outdir ${outputDir} ${inputPath}`;
  exec(cmd, (error) => {
    if (error) return res.status(500).json({ error: 'Conversion failed.' });
    res.json({ download: `/converted/${outputFile}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
=======
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/converted', express.static('converted'));

const upload = multer({ dest: 'uploads/' });

app.post('/convert', upload.single('file'), (req, res) => {
  const inputPath = path.resolve(req.file.path);
  const outputDir = path.resolve('converted');
  const outputFile = req.file.originalname.replace(/\.pdf$/i, '.docx');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const cmd = `libreoffice --headless --convert-to docx --outdir ${outputDir} ${inputPath}`;
  exec(cmd, (error) => {
    if (error) return res.status(500).json({ error: 'Conversion failed.' });
    res.json({ download: `/converted/${outputFile}` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
>>>>>>> d0d7eaf (Initial commit)

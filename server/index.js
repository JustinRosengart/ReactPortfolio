const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, '../src/data/website.json');
const THEME_FILE = path.join(__dirname, '../src/config/theme.ts');
const UPLOAD_DIR = path.join(__dirname, '../public/assets/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        // Use original filename, but sanitize it to be safe
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        cb(null, sanitizedName);
    }
});

const upload = multer({ storage: storage });

// Get content
app.get('/api/content', (req, res) => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.status(404).json({ error: 'Data file not found' });
        }
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

// Update content
app.post('/api/content', (req, res) => {
    try {
        const newData = req.body;
        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 4), 'utf8');
        res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
        console.error('Error writing data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // Return the path relative to public directory
        const relativePath = `/assets/uploads/${req.file.filename}`;
        res.json({ success: true, path: relativePath });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

// Update theme
app.post('/api/theme', (req, res) => {
    try {
        const { accentColor } = req.body;
        if (!accentColor) {
            return res.status(400).json({ error: 'Accent color is required' });
        }

        let themeContent = fs.readFileSync(THEME_FILE, 'utf8');
        
        // Regex to replace the ACCENT_COLOR constant
        // const ACCENT_COLOR = 'teal';
        const regex = /const ACCENT_COLOR = '[\w]+';/;
        const newContent = themeContent.replace(regex, `const ACCENT_COLOR = '${accentColor}';`);
        
        fs.writeFileSync(THEME_FILE, newContent, 'utf8');
        res.json({ success: true, message: 'Theme updated successfully' });
    } catch (error) {
        console.error('Error updating theme:', error);
        res.status(500).json({ error: 'Failed to update theme' });
    }
});

app.listen(PORT, () => {
    console.log(`Builder server running on http://localhost:${PORT}`);
});

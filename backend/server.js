import express from 'express';
import cors from 'cors';
import multer from 'multer';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase
// eslint-disable-next-line no-undef
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        const { data, error } = await supabase.storage.from('pdf-uploads').upload(
            `pdfs/${file.originalname}`,
            file.buffer,
            { contentType: 'application/pdf' }
        );

        if (error) return res.status(500).json({ error: error.message });

        const publicUrl = supabase.storage.from('pdf-uploads').getPublicUrl(data.path).data.publicUrl;

        res.status(200).json({ url: publicUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all PDFs
app.get('/pdfs', async (req, res) => {
    try {
        const { data, error } = await supabase.storage.from('pdf-uploads').list('pdfs');

        if (error) return res.status(500).json({ error: error.message });

        const pdfs = data.map(file => ({
            name: file.name,
            url: supabase.storage.from('pdf-uploads').getPublicUrl(`pdfs/${file.name}`).data.publicUrl
        }));

        res.json(pdfs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

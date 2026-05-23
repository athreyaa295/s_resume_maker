const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', resumeRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'OK', model: 'llama3' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

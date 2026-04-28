require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api', require('./routes/auth'));
app.use('/api/campaigns', require('./routes/campaigns'));
app.use('/api', require('./routes/donations'));
app.use('/api', require('./routes/requests'));
app.use('/api', require('./routes/deliveries'));
app.use('/api', require('./routes/admin'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Candidate = require('./models/Candidate');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// API routes
app.get('/api/candidates', async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

app.post('/api/candidates', async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    const saved = await newCandidate.save();
    res.json(saved);
  } catch (err) {
    console.error("❌ Error saving candidate:", err.message);
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

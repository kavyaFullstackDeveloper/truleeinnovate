const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// 🔹 Create candidate
router.post('/', async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Get all candidates (basic, we'll add filters later)
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

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

// DELETE route to remove a candidate by ID
router.delete('/candidates/:id', async (req, res) => {
  const candidateId = req.params.id;

  try {
    // Find and delete the candidate by ID
    const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);
    
    if (!deletedCandidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

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

// GET candidates with pagination and filters
router.get('/candidates', async (req, res) => {
  try {
    const { page = 1, limit = 10, gender, experience, skills } = req.query;

    // Build the filter object
    let filter = {};
    if (gender) filter.gender = gender;
    if (experience) filter.experience = experience;
    if (skills) filter.skills = { $in: skills.split(',') };

    // Fetch with pagination and filters
    const candidates = await Candidate.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Candidate.countDocuments(filter);

    res.json({
      candidates,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

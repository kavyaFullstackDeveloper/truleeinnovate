const mongoose = require('mongoose');
const Candidate = require('./models/Candidate');

// ✅ Updated URI without deprecated options
mongoose.connect('mongodb+srv://truleeuser:test1234@cluster0.7joraai.mongodb.net/Truleeinnovate?retryWrites=true&w=majority')

.then(async () => {
  console.log("✅ Connected to MongoDB");

  const existing = await Candidate.find();
  if (existing.length > 0) {
    console.log("⚠️ Data already seeded.");
    return mongoose.disconnect();
  }

  await Candidate.insertMany([
    {
      name: 'John Doe',
      phone: '1234567890',
      email: 'john@example.com',
      gender: 'Male',
      experience: '2 Years',
      skills: ['JavaScript', 'React']
    },
    {
      name: 'Jane Smith',
      phone: '9876543210',
      email: 'jane@example.com',
      gender: 'Female',
      experience: '3 Years',
      skills: ['Python', 'Node.js']
    }
  ]);

  console.log("✅ Sample data inserted!");
  mongoose.disconnect();
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

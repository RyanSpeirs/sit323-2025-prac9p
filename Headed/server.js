// server.js
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./Student'); // Import the Student model
const mongoUrl = process.env.MONGO_URL || 'mongodb://admin1:password123@mongo:27017/school?authSource=admin';


const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB (replace with your MongoDB URL if needed)
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// CREATE - Add a new student
app.post('/students', async (req, res) => {
  const { name, age } = req.body;
  try {
    const student = new Student({ name, age });
    await student.save();
    res.status(201).send(student); // Send back the created student
  } catch (err) {
    res.status(500).send('Error creating student: ' + err.message);
  }
});

// READ - Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find(); // Get all students
    res.status(200).json(students); // Send the list of students as JSON
  } catch (err) {
    res.status(500).send('Error retrieving students: ' + err.message);
  }
});

// READ - Get a student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student); // Send the student document
  } catch (err) {
    res.status(500).send('Error retrieving student: ' + err.message);
  }
});

// UPDATE - Update a student's information
app.put('/students/:id', async (req, res) => {
  const { name, age } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age },
      { new: true } // Return the updated document
    );
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(student); // Send the updated student
  } catch (err) {
    res.status(500).send('Error updating student: ' + err.message);
  }
});

// DELETE - Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student deleted');
  } catch (err) {
    res.status(500).send('Error deleting student: ' + err.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

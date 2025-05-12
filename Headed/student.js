const mongoose = require('mongoose');

// Define the schema for the Student
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  age: {
    type: Number,
    required: true, // Age is required
  },
});

// Create the model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

//  server.js 
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./student.js";  // Define a model called "Student"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error("Mongo connection error:", err);
    process.exit(1);
  });

// CRUD endpoints for students
app.post("/students", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/students", async (_req, res) => {
  try {
    const students = await Student.find().lean();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean();
    student ? res.json(student) : res.status(404).end();
  } catch (error) {
    res.status(500).json({ error: "Student not found" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    student ? res.json(student) : res.status(404).end();
  } catch (error) {
    res.status(400).json({ error: "Failed to update student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id).lean();
    result ? res.status(204).end() : res.status(404).end();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete student" });
  }
});

// Run the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
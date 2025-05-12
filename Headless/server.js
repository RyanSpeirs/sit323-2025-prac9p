// server.js  
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const mongoUri = process.env.MONGO_URI || 
  'mongodb://admin1:password123@mongo-0.mongo.default.svc.cluster.local:27017,' +
  'mongo-1.mongo.default.svc.cluster.local:27017,' +
  'mongo-2.mongo.default.svc.cluster.local:27017/?replicaSet=rs0';

let db;

async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db('testdb'); // Use or create a database named "testdb"
    console.log('✅ Connected to MongoDB replica set');
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

app.get('/', (req, res) => {
  res.send('MongoDB + Node.js API is running');
});

app.get('/students', async (req, res) => {
  try {
    const students = await db.collection('students').find().toArray();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// CREATE a student
app.post('/students', async (req, res) => {
    try {
      const student = await db.collection('students').insertOne(req.body);
      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create student' });
    }
  });
  
  // READ one student by ID
  app.get('/students/:id', async (req, res) => {
    try {
      const { ObjectId } = require('mongodb');
      const student = await db.collection('students').findOne({ _id: new ObjectId(req.params.id) });
      student ? res.json(student) : res.status(404).json({ error: 'Student not found' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid ID' });
    }
  });
  
  // UPDATE a student by ID
  app.put('/students/:id', async (req, res) => {
    try {
      const { ObjectId } = require('mongodb');
      const updated = await db.collection('students').findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: 'after' }
      );
      updated.value ? res.json(updated.value) : res.status(404).json({ error: 'Student not found' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid update request' });
    }
  });
  
  // DELETE a student by ID
  app.delete('/students/:id', async (req, res) => {
    try {
      const { ObjectId } = require('mongodb');
      const result = await db.collection('students').deleteOne({ _id: new ObjectId(req.params.id) });
      result.deletedCount ? res.status(204).end() : res.status(404).json({ error: 'Student not found' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid delete request' });
    }
  });


connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
  });
});
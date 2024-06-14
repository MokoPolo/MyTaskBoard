import express, { Request, Response } from 'express';
import { getAllTasks, addTask, deleteTask } from './taskRepository';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const password = process.env.DB_PASS;
if (!password) {
  throw new Error('Database URL is not defined.');
}

const databaseUrl = process.env.DATABASE?.replace('<PASSWORD>', password);

if (!databaseUrl) {
  throw new Error('Database URL is not defined.');
}

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.log('Error connecting to the database', error);
  });

const taskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

const app = express();

// To parse JSON bodies
app.use(express.json());

// GET request
app.get('/', (req, res) => {
  try {
    res.send(getAllTasks());
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while getting tasks');
  }
});

// POST request
app.post('/', (req, res) => {
  try {
    const task = req.body;
    const createdTask = addTask(task);
    res.status(201).send(createdTask);
    res.send(addTask(req.body));
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// // PUT request
// app.put("/", (req, res) => {
//   res.send("PUT request to the homepage");
// });

// DELETE request
app.delete('/', (req, res) => {
  try {
    console.log(req.body);
    res.send(deleteTask(req.body.id));
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

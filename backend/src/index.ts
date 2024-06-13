import express, { Request, Response } from 'express';
import { getAllTasks, addTask, deleteTask } from './taskRepository';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY; // Retrieve the environment variable
console.log('API Key:', apiKey);

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

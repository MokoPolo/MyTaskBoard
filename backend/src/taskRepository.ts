import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

interface Task {
  status: string;
  name: string;
  id: string;
}

function getAllTasks(): Task[] {
  const filePath = path.resolve(__dirname, 'request.json');
  const tasks = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(tasks);
}

function addTask(taskToAdd: Task) {
  const tasks: Task[] = getAllTasks();
  taskToAdd.id = uuidv4();
  tasks.push(taskToAdd);
  const filePath = path.resolve(__dirname, 'request.json');
  fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      return JSON.stringify({ id: taskToAdd.id });
    }
  });
}

function deleteTask(taskId: string) {
  const tasks: Task[] = getAllTasks();
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  // tasks.splice(taskIndex, 1);
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  const filePath = path.resolve(__dirname, 'request.json');
  fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), (err) => {
    if (err) {
      console.error(err);
      throw new Error('Error occurred while deleting task');
    } else {
      console.log('Task deleted');
    }
  });
}

function populateTasksToFile() {
  const task1: Task = {
    status: 'on hold',
    name: 'cook dinner',
    id: '',
  };
  const task2: Task = {
    status: 'completed',
    name: 'cook dinnerzz',
    id: '',
  };

  const tasks: Task[] = [task1, task2];
  fs.writeFile('request.json', JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File created');
    }
  });
}

export { getAllTasks, populateTasksToFile, addTask, deleteTask };

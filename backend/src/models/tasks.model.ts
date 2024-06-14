import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['in progress', 'on hold', 'completed'],
      message: 'Difficulty is either: in progress, on hold, completed',
    },
    default: 'on hold', // Add default value here
  },
});

const TaskModel = mongoose.model('Task', taskSchema);

export default TaskModel;

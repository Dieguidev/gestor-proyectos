import mongoose, { Schema, Types } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
}

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Task Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required']
  },
}, {
  timestamps: true
})

export const TaskModel = mongoose.model<ITask>('Task', taskSchema, 'tasks');

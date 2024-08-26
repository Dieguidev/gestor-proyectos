import mongoose, { Document, Schema, Types } from "mongoose";

const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed',
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
  name: string;
  description: string;
  projectId: Types.ObjectId;
  status: TaskStatus;
  completedBy: Types.ObjectId | null;
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
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project is required']
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
})

export const TaskModel = mongoose.model<ITask>('Task', taskSchema, 'tasks');

import mongoose, { PopulatedDoc, Schema } from "mongoose";
import { ITask } from "./task.model";
import { IUser } from "./user.model";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[]
  manager: PopulatedDoc<IUser & Document>
  team: PopulatedDoc<IUser & Document>[]
}

const projectSchema = new Schema({

  projectName: {
    type: String,
    required: [true, 'Project Name is required'],
    trim: true
  },
  clientName: {
    type: String,
    required: [true, 'Client Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  tasks:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Manager is required']
  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
});

export const ProjectModel = mongoose.model<IProject>('Project', projectSchema, 'projects');

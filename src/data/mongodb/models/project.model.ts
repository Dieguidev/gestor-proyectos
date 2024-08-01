import mongoose, { PopulatedDoc, Schema } from "mongoose";
import { ITask } from "./task.model";

export interface IProject extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<ITask & Document>[]
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
  ]
}, {
  timestamps: true
});

export const ProjectModel = mongoose.model<IProject>('Project', projectSchema, 'projects');

import mongoose, { Schema } from "mongoose";

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
}, {
  timestamps: true
});

export const ProjectModel = mongoose.model('Project', projectSchema, 'projects');

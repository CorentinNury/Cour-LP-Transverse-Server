import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, {collection:'Project'});


export const Project = mongoose.model('Project', projectSchema);
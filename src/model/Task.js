import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    duration: String,
    priority: Number
}, {collection:'Task'});


export const Task = mongoose.model('Task', taskSchema);
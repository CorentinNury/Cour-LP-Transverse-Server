import mongoose from 'mongoose';
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    creator: String,
    password: String,
    
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
}, {collection:'User'});


export const User = mongoose.model('User', userSchema);
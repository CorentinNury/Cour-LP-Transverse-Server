// task.js
import {Task} from "../model/Task";
import {Project} from "../model/Project";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Task {
    _id: ID!
    name: String 
    description: String
    duration: String
    priority: String  
  }

  input TaskInput{
    name: String
    description: String
    duration: String
    priority: String
  }


  extend type Query {
    taskSchemaAssert: String
    tasks: [Task]
    task(_id: ID!): Task
  }

  extend type Mutation {
    createTask(name: String!,description: String!,duration: String!,priority: String!): Boolean
    addTaskToProjects(_id: ID!,input: TaskInput!): Boolean
    createTaskWithInput(input: TaskInput!): Task
    deleteTask(_id: ID!): Boolean
    updateTask(_id: ID!,input: TaskInput!): Task
  }

`;

export const resolvers = {
  Query: {
    taskSchemaAssert: async () => {
      return "Task schema";
    },
    tasks: async () => {
      return Task.find();
      let tasks = [];
      for (let index = 0; index < 5; index++) {
        tasks.push(dummy(Task, {
          ignore: ignoredFields,
          returnDate: true
        }))
      } 
      return tasks;
    },
    task: async (root, { _id }, context, info) => {
      
      return Task.findOne({_id});
      return dummy(Task, {
        ignore: ignoredFields,
        returnDate: true
      })
    },
  },
  Mutation: {
      createTask: async (root, args, context, info) => {
      await Task.create(args);
      return true;
    },
    addTaskToProjects: async (root, { _id, input }) => {
     
      
      var task = await Task.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          tasks: task
        }
      })
      
      project.save();
      return true;
    },
    createTaskWithInput: async (root, { input }, context, info) => {
      //input.password = await bcrypt.hash(input.password, 10);
      return Task.create(input);
    },
    deleteTask: async (root, { _id }, context, info) => {
     if(await Task.remove({ _id }))
     {
       return true;
     }
      
    },
    updateTask: async (root, { _id, input }) => {
      return Task.findByIdAndUpdate(_id, input, { new: true });
    }
  },
};

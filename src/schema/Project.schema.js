// project.js
import {Project} from "../model/Project";
import { Task } from "../model/Task";
//Required for dummy data
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type Project {
    _id: ID!
    name: String
    description: String
    tasks: [Task]
  }

  input ProjectInput{
    name: String
    description: String
  }


  extend type Query {
    projectSchemaAssert: String
    projects: [Project]
    project(_id: ID!): Project
  }

  extend type Mutation {
    createProject(name: String!,description: String!): Boolean
    createProjectWithInput(input: ProjectInput!): Project
    deleteProject(_id: ID!): Boolean
    updateProject(_id: ID!,input: ProjectInput!): Project
    addTaskToProject(_id: ID!,input: TaskInput!): Boolean
  }

`;

export const resolvers = {
  Query: {
    projectSchemaAssert: async () => {
      return "Project schema";
    },
    projects: async () => {
      var test =  await Project.find().populate('tasks');
      console.log(test)
      return test;
    },
    project: async (root, { _id }, context, info) => {
      return await Project.findOne({_id}).populate('tasks');
    }
  },
  Mutation: {
    createProject: async (root, args, context, info) => {
      await Project.create(args);
      return true;
    },
    createProjectWithInput: async (root, { input }, context, info) => {
      return Project.create(input);
    },
    deleteProject: async (root, { _id }, context, info) => {
      await Project.remove({ _id });
      return true;
    },
    updateProject: async (root, { _id, input }) => {
      return Project.findByIdAndUpdate(_id, input, { new: true });
    },
    addTaskToProject: async (root, { _id, input }) => {
      var task = await Task.create(input);
      var project = await Project.findByIdAndUpdate(_id,{
        $push: {
          tasks: task
        }
      })
      console.log(task)
      console.log(project)
      project.save();
      return true;
    },
  },
};

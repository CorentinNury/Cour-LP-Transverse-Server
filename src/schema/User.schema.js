// user.js
import {User} from "../model/User";
//Required for dummy data
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const dummy = require('mongoose-dummy');
const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];


export const typeDef = `
  type User {
    _id: ID!
      name: String  
      password: String
    }

  input UserInput{
    name: String
    surname: String
    password: String
    
  }

  extend type Query {
    userSchemaAssert: String
    users: [User]
    user(_id: ID!): User
  }

  extend type Mutation {
    createUser(name: String!,password: String!): User
    createUserWithInput(input: UserInput!): User
    login(name: String! , password: String!): User
    deleteUser(_id: ID!): Boolean
    updateUser(_id: ID!,input: UserInput!): User
  }

`;

export const resolvers = {
  Query: {
    // Get all users
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
    // Get all users
    users: async () => {
      return User.find();
    },
    // Get user by ID
    user: async (root, { _id }, context, info) => {
      // With a real mongo db
      return User.findOne({ _id });
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
    const password = await bcrypt.hash(args.password, 10);
    const user = await User.create({...args, password:password});
    return user;
    },
    createUserWithInput: async (root, { input }, context, info) => {
      input.password = await bcrypt.hash(input.password, 10);
      return User.create(input);
    },
    deleteUser: async (root, { _id }, context, info) => {
      return User.remove({ _id });
    },
    updateUser: async (root, { _id, input }) => {
      return User.findByIdAndUpdate(_id, input, { new: true });
    },
    login: async (root, args , context, info) => {
      const user = await User.findOne({name: args.name})
      if(!user){
          return null;
      }
      if(await bcrypt.compareSync(args.password,user.password)){
        return user;
      }
    }
  }
};

/*

Exemple 

# Write your query or mutation here
query GetAllUsers{
  users{
    _id
    name  
    surname
  }
}

# Write your query or mutation here
query GetOneUserByID{
  user(_id : "5e9deb26930d0e19e49d8373"){
    _id
    name
    surname
  }
}

mutation CreateUser{
  createUser(name: "MyFirstUser",  pseudo: "first.user", password "jjjj")
}

*/

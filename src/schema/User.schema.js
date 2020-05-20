export const typeDef = `

type User {
    name: String 
    surname: String
    dateOfBirth: String
    friends: [User]
    project: [Project]
  }

`
export const resolvers = {
Query: {
    userSchemaAssert: async () => {
      return "Hello world, from User schema";
    },
  },
  Mutation: {
    
  }
}
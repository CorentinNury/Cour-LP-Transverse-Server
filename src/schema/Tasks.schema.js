export const typeDef = `

type Task {
    name: String 
    duration: String
    priority: String
    asignee: [User]
    
  }

`
export const resolvers = {
Query: {
    taskSchemaAssert: async () => {
      return "Hello world, from Task schema";
    },
  },
  Mutation: {
    
  }
}
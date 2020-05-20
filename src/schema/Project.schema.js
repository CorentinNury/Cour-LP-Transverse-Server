export const typeDef = `

type Project {
    name: String 
    creator: String
    task: [Task]
  }

`
export const resolvers = {
Query: {
    projectSchemaAssert: async () => {
      return "Hello world, from Project schema";
    },
  },
  Mutation: {
    
  }
}
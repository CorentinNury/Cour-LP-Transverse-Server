import { ApolloServer,gql } from 'apollo-server';

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
 type User {
   name: String 
   surname: String
   dateOfBirth: String
   friends: [User]
   project: [Project]
 }
 type Task {
  name: String 
  duration: String
  priority: String
  asignee: [User]
  
}
type Project {
  name: String 
  creator: String
  task: [Task]
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    user: [User]
    project: [Project]
    task: [Task]
  }
`;


const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  const task = [
    {
      name: 'toto', 
      duration: '10',
      priority: 'hight',
      
    },
    {
      name: 'titi', 
      duration: '1',
      priority: 'low',
    },
  ];

  const project = [
    {
      name: 'My project 1',
      creator: 'Moi',
      
    },
    {
      name: 'Your project 2',
      creator: 'you',
    },
  ];

  const user = [
    {
      name: 'Harry ',
      surname: 'Potter',
      dateOfBirth: '01/01/2000',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];



// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      user: () => user,
      project: () => project,
      task: () => task,
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
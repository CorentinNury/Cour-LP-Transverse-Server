import { ApolloServer, gql } from "apollo-server";
import { schema } from "./src/schema";

//Pass the schema to ApolloServer
const server = new ApolloServer({ schema })

//Launch the server
server.listen().then(({ url }) => {
  console.log(`==> 🚀  Server ready at ${url} `);
});
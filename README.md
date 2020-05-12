# Cour-LP-Transverse-Server

- Init of the node.js app

- Use appolo server

- Try to do some Queries and Mutation

- Make the schema

- Database creation 

- (Mongoose) 


## First step 

Creation of a git repo. 

git clone https://github.com/pipic1/Cour-LP-Transverse-Server.git

Now initialisation of the project
```sh
# Creation of the package.json
npm init --yes
npm install apollo-server graphql
mkdir src
touch index.js
New-Item -ItemType file index.js
```

## Dependencies (pasckage.json)


Edit your package.json 

```
  "dependencies": {
    "apollo-server": "^2.12.0",
    "babel-cli": "^6.26.0",
    "babel-node": "0.0.1-security",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "graphql": "^15.0.0",
    "lodash": "^4.17.15",
    "mongodb": "^3.5.5",
    "mongoose": "^5.9.7",
    "nodemon": "^2.0.3"
  },
  "devDependencies": {
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5"
  }

```

Then run 

```

$ > npm install

```


## Edit index.js

Now in the file index.js, we gonna create our server.
Edit the file, and then write this code: 

import { ApolloServer,gql } from 'apollo-server';

Write a schema:

```
const typeDefs = gql`
    type Book {
      title: String
      author: String
    }
    `;

```
In your schema add the query type that describe all query that you can get

```

type Query {
  books: [Book]
}

```

Write a resolvers:


```
const resolvers = {
    Query: {
      books: () => books,
    },
  };
```

Add some dummy datas: 


```

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

```

Then init AppoloServer: 

``` const server = new ApolloServer({ typeDefs, resolvers }); ```

Start the server : 

```
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Then run 

```

$ > npm start

```

Go to http://localhost:4000/

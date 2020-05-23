# Cour-LP-Transverse-Server

Now graphql is configured, you can play with the api at localhost:4000

## Part 2 

We gonna make an external schema, split the simple string schema to multiples files

```
📁 Model - Mongoose (Database)
     📃 User
     📃 Project
     📃 Ta sks
     
📁 Schema - GraphQL Schema ( Typedefs & Resolvers )
     📃 User.schema
     📃 Project.schema
     📃 Tasks.schema
```

This structure permit to the project to be more readable and maintainable.

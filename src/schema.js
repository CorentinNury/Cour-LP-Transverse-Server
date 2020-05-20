import { merge } from 'lodash';

// User typedefs and resolvers
import {
  typeDef as User,
  resolvers as userResolvers,
} from './schema/User.schema';

import {
  typeDef as Project,
  resolvers as projectResolvers,
} from './schema/Project.schema';

import {
  typeDef as Task,
  resolvers as taskResolvers,
} from './schema/Tasks.schema';

// Add more schema and model here
//....
//....

// General query
const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

// Do not forget to merge at the end of typeDefs and resolvers
export const schema = makeExecutableSchema({
  typeDefs: [ Query, User, Project, Task],
  resolvers: merge(resolvers, userResolvers, projectResolvers, taskResolvers),
});
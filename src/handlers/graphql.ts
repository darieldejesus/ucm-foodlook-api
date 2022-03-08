import { ApolloServer } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import resolvers from "../resolvers";
import typeDefs from "../schema";

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const handler = apolloServer.createHandler();

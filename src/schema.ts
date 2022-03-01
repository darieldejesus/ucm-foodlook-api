import { gql } from "graphql-tag";

const schema = gql`
  type Query {}

  type Mutation {}

  schema {
    query: Query;
    mutation: Mutation;
  }
`;

export default schema;

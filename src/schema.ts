import { gql } from "graphql-tag";

const schema = gql`
  type PresignedUrl {
    fileName: String!
    path: String!
    url: String!
    expirationDate: Int!
  }

  input PresignedUrlInput {
    fileName: String!
    size: Int!
  }

  type Query {
    presignedUrl: PresignedUrl
  }

  type Mutation {
    presignedUrl(input: PresignedUrlInput): PresignedUrl
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

export default schema;

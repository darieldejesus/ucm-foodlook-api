import { gql } from "graphql-tag";

const schema = gql`
  type PresignedUrl {
    fileName: String!
    path: String!
    url: String!
    expirationDate: Int!
  }

  type Detection {
    fileName: String!
    path: String!
    lines: [String!]!
  }

  input PresignedUrlInput {
    fileName: String!
    size: Int!
  }

  type Query {
    detection(fileName: String!): Detection!
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

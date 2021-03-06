import { gql } from "graphql-tag";

const schema = gql`
  type PresignedUrl {
    fileName: String!
    path: String!
    url: String!
    expirationDate: Int!
  }

  type Detection {
    uuid: String!
    query: String!
  }

  type DetectionSet {
    fileName: String!
    path: String!
    lines: [Detection!]!
  }

  type Image {
    uuid: String!
    title: String!
    url: String!
  }

  input PresignedUrlInput {
    fileName: String!
    size: Int!
  }

  type Query {
    detection(fileName: String!): DetectionSet!
    images(detectionUuid: String!): [Image!]!
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

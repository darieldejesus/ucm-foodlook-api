import PresignedUrl from "./mutations/presignedUrl";

const resolvers = {
  Query: {},
  Mutation: {
    presignedUrl: PresignedUrl,
  },
};

export default resolvers;

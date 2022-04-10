import PresignedUrl from "./mutations/presignedUrl";
import Detection from "./queries/detection";

const resolvers = {
  Query: {
    detection: Detection,
  },
  Mutation: {
    presignedUrl: PresignedUrl,
  },
};

export default resolvers;

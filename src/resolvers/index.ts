import PresignedUrl from "./mutations/presignedUrl";
import Detection from "./queries/detection";
import Images from "./queries/images";

const resolvers = {
  Query: {
    detection: Detection,
    images: Images,
  },
  Mutation: {
    presignedUrl: PresignedUrl,
  },
};

export default resolvers;

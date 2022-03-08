interface PresignedUrlProps {
  fileName: string;
  bucket: string;
}

interface PresignedUrlResult {
  name: string;
  extension: string;
  path: string;
  url: string;
}

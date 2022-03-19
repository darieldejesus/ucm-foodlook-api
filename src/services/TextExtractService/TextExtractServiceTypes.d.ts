declare namespace TextExtract {
  export interface ConstructorProps<T> {
    textract: T;
  }

  export interface ExtractLabelProps {
    bucket: string;
    document: string;
  }
}

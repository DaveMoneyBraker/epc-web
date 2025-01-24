export interface FileMapperProps {
  availableHeaders: string[];
  requiredHeaders: string[][];
  fileSize?: number;
  additionalInputs?: React.ReactNode;
  onFileSubmit: (file: string, filename: string) => void;
  progress: number;
  submitted: boolean;
  submitError: boolean;
  reset?: () => void;
}

export interface FileMapperPreview {
  filename: string;
  containHeaders: boolean;
  skip: boolean;
  columns: FileMapperPreviewColumn[];
}

export interface FileMapperPreviewColumn {
  data: string[];
  header: string;
  skip: boolean;
}

export interface PapaparseRawData {
  data: string[][];
  filename: string;
}

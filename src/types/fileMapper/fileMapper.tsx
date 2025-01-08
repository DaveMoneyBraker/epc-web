export interface FileMapperProps {
  availableHeaders: string[];
  requiredHeaders: string[][];
  fileSize?: number;
  AdditionalInputs?: React.ReactNode;
  onFileSubmit: (file: string | File, filename: string) => void;
  progress: number;
  submitted: boolean;
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

export interface FileMapperProps {
  apiUrl: string;
  availableHeaders: string[];
  requiredHeaders: string[][];
  fileSize?: number;
}

export interface FileMapperPreview {
  filename: string;
  skip: boolean;
  columns: FileMapperPreviewColumn[];
}

export interface FileMapperPreviewColumn {
  data: string[];
  header: string;
  skip: boolean;
}

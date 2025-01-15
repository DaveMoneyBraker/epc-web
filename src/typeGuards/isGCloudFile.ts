interface GCloudFile {
  id: string;
  filename: string;
  gcloudId: string;
}

export const isGCloudFile = (file: any): file is GCloudFile =>
  file !== undefined &&
  file !== null &&
  file.id !== undefined &&
  file.filename !== undefined &&
  file.gcloudId !== undefined;

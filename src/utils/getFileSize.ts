export const getFileSize = (size: string): string => {
  const sizeInMb = (+size / (1024 * 1024)).toFixed(2);
  if (size.length <= 2 || +sizeInMb === 0) {
    return `${size}B`;
  }
  return `${sizeInMb}Mb`;
};

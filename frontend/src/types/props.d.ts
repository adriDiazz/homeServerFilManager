import { FileType } from "../../types/files";

export interface DirectoryListProps {
  data: FileType[] | null;
  handleDirectoryClick: (file: FileType) => void;
}

export interface DocModalProps {
  files: File[];
  setAllClosed: (c: boolean) => void;
  allClosed: boolean;
}

export interface MultipleFilesProps {
  files: File[];
  setAllClosed: (C: boolean) => void;
  allClosed: boolean;
}

export interface uploadFileFunctionProps {
  (
    file: File,
    setSelectingDirectory: (b: boolean) => void,
    directory: string,
    notify: () => ToastContent,
    notifyError: () => ToastContent,
    name: string
  ): void;
}

export interface uploadMultipleFilesFunctionProps {
  (
    file: File[],
    setSelectingDirectory: (b: boolean) => void,
    directory: string,
    notify: () => ToastContent,
    notifyError: () => ToastContent,
    name: string
  ): void;
}

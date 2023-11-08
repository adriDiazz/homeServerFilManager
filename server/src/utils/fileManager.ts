import { readdirSync, statSync } from "fs";
import { join, extname } from "path";

export const checkExtension = (filename: string) => {
  const allowedExt = [
    ".jpg",
    ".png",
    ".gif",
    ".jpeg",
    ".svg",
    ".doc",
    ".txt",
    ".csv",
    ".docx",
    ".xls",
    ".xml",
    ".pdf",
    ".zip",
    ".ppt",
    ".mp4",
    ".ai",
    ".psd",
    ".mp3",
    ".avi",
  ];
  const ext = extname(filename);
  return allowedExt.includes(ext) && ext !== "";
};

interface Item {
  name: String;
  path: String;
  isDirectory: Boolean;
  children?: String[];
}

export const readdirRecursive = (folderPath: string) => {
  const items = readdirSync(folderPath);
  const result: Item[] = [];

  items.forEach((item) => {
    const itemPath = join(folderPath, item);
    const stats = statSync(itemPath);

    const newItem: Item = {
      name: item,
      path: itemPath,
      isDirectory: stats.isDirectory(),
    };

    if (newItem.isDirectory) {
      newItem.children = readdirSync(itemPath);
    }

    result.push(newItem);
  });

  return result;
};

export function bytesToGb(bytes: number) {
  if (bytes >= 1073741824) {
    const gb = bytes / 1073741824; // 1 GB = 1073741824 bytes
    return gb.toFixed(2) + " GB";
  } else if (bytes >= 1048576) {
    const mb = bytes / 1048576; // 1 MB = 1048576 bytes
    return mb.toFixed(2) + " MB";
  } else if (bytes >= 1024) {
    const kb = bytes / 1024; // 1 KB = 1024 bytes
    return kb.toFixed(2) + " KB";
  } else {
    return bytes + " bytes";
  }
}

export const getTypesRecursive = (folderPath: string) => {
  const items = readdirSync(folderPath);
  // const result: Item[] = [];
  const result = {
    documents: 0,
    images: 0,
    videos: 0,
  };

  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const videoExtensions = [".mp4", ".avi", ".mkv"];

  items.forEach((item) => {
    const itemPath = join(folderPath, item);
    const stats = statSync(itemPath);

    if (stats.isFile()) {
      const ext = extname(item);
      if (ext.includes("pdf")) {
        result.documents = result.documents + stats.size;
      } else if (imageExtensions.includes(ext)) {
        result.images = result.images + stats.size;
      } else if (videoExtensions.includes(ext)) {
        result.videos = result.videos + stats.size;
      }
    }

    if (stats.isDirectory()) {
      const subfolderResult = getTypesRecursive(itemPath);
      result.documents += subfolderResult.documents;
      result.images += subfolderResult.images;
      result.videos += subfolderResult.videos;
    }
  });

  return result;
};

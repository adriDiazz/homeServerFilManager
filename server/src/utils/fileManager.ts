import { extname } from "path";
import { readdirSync, statSync } from "fs";
import { join } from "path";

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

export function bytesToGB(bytes: number) {
  const gb = bytes / 1073741824; // 1 GB = 1073741824 bytes
  return gb.toFixed(2);
}

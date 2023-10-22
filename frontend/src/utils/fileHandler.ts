export const fileHandler = (file, setImageSrc) => {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result); // Establece la URL de la imagen en el estado
    };

    reader.readAsDataURL(files[0]);
  }
};

export function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024) {
    return sizeInBytes.toFixed(2) + " bytes";
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
}

export function formatFileName(fileName: string) {
  const splited = fileName.split("-")[0];
  return splited;
}

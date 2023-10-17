import { useState, useEffect } from "react";
import styles from "./MultipleFiles.module.css";
import MultipleFilesContent from "./MultipleFilesContent";
import DirectorySelection from "./DirectorySelection";

const MultipleFiles = ({ files, setAllClosed, allClosed }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [selectingDirectory, setSelectingDirectory] = useState(false);

  useEffect(() => {
    const processFiles = async () => {
      for (const file of files) {
        if (file.type.startsWith("image/")) {
          const imageSrc = await readFileAsDataURL(file);
          setImageSrc(imageSrc);
        } else if (file.type.startsWith("video/")) {
          const videoSrc = await readFileAsDataURL(file);
          setVideoSrc(videoSrc);
        } else if (file.type.startsWith("application/pdf")) {
          const pdfSrc = await readFileAsDataURL(file);
          setPdfSrc(pdfSrc);
        }
      }
    };

    processFiles();
  }, [files]);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className={styles.modalWrapper}>
      {selectingDirectory && !allClosed && (
        <DirectorySelection
          file={imageSrc}
          fileInput={files[0]}
          files={files}
          setAllClosed={setAllClosed}
        />
      )}
      {!selectingDirectory && !allClosed && (
        <MultipleFilesContent
          files={files}
          videoSrc={videoSrc}
          pdfSrc={pdfSrc}
          imageSrc={imageSrc}
          setSelectingDirectory={setSelectingDirectory}
        />
      )}
    </div>
  );
};

export default MultipleFiles;

import Button from "../ui/Button";
import styles from "./MultipleFiles.module.css";

export interface MultipleFilesContentProps {
  files: File[];
  imageSrc: string;
  videoSrc: string;
  pdfSrc: string;
  setSelectingDirectory: (b: boolean) => void;
}

const MultipleFilesContent: React.FC<MultipleFilesContentProps> = ({
  files,
  imageSrc,
  videoSrc,
  pdfSrc,
  setSelectingDirectory,
}) => {
  console.log(files);
  return (
    <div className={styles.filesWrapper}>
      <h2>Preview Your Files</h2>
      {Object.keys(files).map((key) => {
        if (files[key].type.startsWith("image/")) {
          return (
            <div className={styles.imgWrapper} key={key}>
              <img
                src={imageSrc}
                alt="Dropped image"
                className={styles.image}
              />
              <input type="text" placeholder={files[key].name} />
            </div>
          );
        } else if (files[key].type.startsWith("video/")) {
          return (
            <div className={styles.videoWrapper} key={key}>
              <video src={videoSrc} className={styles.videoP}>
                <source src={videoSrc} type={files[key].type} />
              </video>
              <input type="text" placeholder={files[key].name} />
            </div>
          );
        } else if (files[key].type.startsWith("application/pdf")) {
          return (
            <div className={styles.frameWrapper} key={key}>
              <iframe
                src={pdfSrc}
                title="PDF Viewer"
                className={styles.iframeP}
              ></iframe>
              <input type="text" placeholder={files[key].name} />
            </div>
          );
        } else {
          return (
            <div key={key}>
              <h2>Solo se permiten archivos de imagen, video o pdf</h2>
            </div>
          );
        }
      })}
      <div className={styles.btnWrapper}>
        <Button
          onClick={() => {
            setSelectingDirectory(true);
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default MultipleFilesContent;

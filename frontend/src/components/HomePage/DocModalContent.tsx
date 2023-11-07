import Button from "../ui/Button";
import styles from "./DocModal.module.css";

export interface DocModalContentProps {
  files: File[];
  imageSrc: string;
  setSelectingDirectory: (c: boolean) => void;
  fileName: string;
  setFilename: (s: string) => void;
}

const DocModalContent: React.FC<DocModalContentProps> = ({
  files,
  imageSrc,
  setSelectingDirectory,
  fileName,
  setFilename,
}) => {
  return (
    <>
      <h2>Preview Your File</h2>
      {files[0].type.startsWith("video/") && (
        <video controls width="90%" height="360" src={imageSrc}>
          <source src={imageSrc} type={files[0].type} />
        </video>
      )}

      {files[0].type.startsWith("application/pdf") && (
        <div className={styles.iframeWrapper}>
          <iframe
            src={imageSrc}
            width="90%"
            height="500px"
            title="PDF Viewer"
          ></iframe>
        </div>
      )}

      {files[0].type.startsWith("image/") && (
        <img
          src={imageSrc}
          alt="Droped Image"
          className={styles.modalWrapperImage}
        />
      )}

      <div className={styles.btnWrapper}>
        <input
          type="text"
          placeholder={files[0].name}
          value={fileName}
          onChange={(e) => {
            setFilename(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            setSelectingDirectory(true);
          }}
        >
          Upload
        </Button>
      </div>
    </>
  );
};

export default DocModalContent;

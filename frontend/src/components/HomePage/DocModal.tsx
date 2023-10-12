import { useState } from "react";
import styles from "./DocModal.module.css";

const DocModal = ({ files }) => {
  const [imageSrc, setImageSrc] = useState("");

  console.log(files);

  if (
    files[0].type.startsWith("image/") ||
    files[0].type.startsWith("application/pdf") ||
    files[0].type.startsWith("video/")
  ) {
    const reader = new FileReader();

    reader.onload = function (e) {
      setImageSrc(e.target.result); // Establece la URL de la imagen en el estado
    };

    reader.readAsDataURL(files[0]);
  }

  return (
    <div className={styles.modalWrapper}>
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
        <img src={imageSrc} alt="Droped Image" />
      )}

      <div className={styles.btnWrapper}>
        <input type="text" placeholder="Enter the file name" />
        <button className={styles.btn}>Upload</button>
      </div>
    </div>
  );
};

export default DocModal;

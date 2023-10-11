import { useState } from "react";
import styles from "./DocModal.module.css";

const DocModal = ({ files }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [PDF, setPDF] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  console.log(files);

  if (
    files[0].type.startsWith("image/") ||
    files[0].type.startsWith("application/pdf")
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
      {/* <img src={imageSrc} alt="Dropped Image" /> */}
      <div
        style={{
          width: "100%",
        }}
      >
        <iframe
          src={imageSrc}
          width="100%"
          height="500px"
          title="PDF Viewer"
        ></iframe>
      </div>

      <div className={styles.btnWrapper}>
        <button className={styles.btn}>Upload</button>
      </div>
    </div>
  );
};

export default DocModal;

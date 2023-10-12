import { useState } from "react";
import styles from "./MultipleFiles.module.css";

const MultipleFiles = ({ files }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [pdfSrc, setPdfSrc] = useState("");
  const [videoSrc, setVideoSrc] = useState("");

  return (
    <div className={styles.modalWrapper}>
      <h2>Preview Your Files</h2>
      <div className={styles.filesWrapper}>
        {Object.keys(files).map((key) => {
          if (files[key].type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = function (e) {
              setImageSrc(e.target.result);
            };

            reader.readAsDataURL(files[key]);
            return (
              <div className={styles.imgWrapper}>
                <img
                  src={imageSrc}
                  alt="Droped image"
                  className={styles.image}
                />
                <input type="text" placeholder={files[key].name} />
              </div>
            );
          } else if (files[key].type.startsWith("video/")) {
            const reader = new FileReader();

            reader.onload = function (e) {
              setVideoSrc(e.target.result);
            };

            reader.readAsDataURL(files[key]);
            return (
              <div className={styles.videoWrapper}>
                <video src={videoSrc} className={styles.videoP}>
                  <source src={videoSrc} type={files[key].type} />
                </video>
                <input type="text" placeholder={files[key].name} />
              </div>
            );
          } else if (files[key].type.startsWith("application/pdf")) {
            const reader = new FileReader();

            reader.onload = function (e) {
              setPdfSrc(e.target.result);
            };

            reader.readAsDataURL(files[key]);
            return (
              <div className={styles.frameWrapper}>
                <iframe
                  src={pdfSrc}
                  title="PDF Viewer"
                  className={styles.iframeP}
                ></iframe>
                <input type="text" placeholder={files[key].name} />
              </div>
            );
          }
        })}
      </div>
      <div className={styles.btnWrapper}>
        <button className={styles.btn}>Upload</button>
      </div>
    </div>
  );
};

export default MultipleFiles;

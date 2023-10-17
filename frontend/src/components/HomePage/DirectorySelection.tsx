import { useEffect, useState } from "react";
import styles from "./DirectorySelection.module.css";
import useFetch from "../../hooks/useFetch";
import { shortName } from "../../utils/utils";
import { uploadFile, uploadMultipleFiles } from "../../services/uploadService";
import Loader from "../ui/Loader";
import DirectoryList from "./DirectoryList";

function DirectorySelection({
  file,
  name = "",
  fileInput,
  files = [],
  setAllClosed,
}) {
  const { data, error, fetchData, loading } = useFetch();
  const [directory, setDirectory] = useState("/");

  console.log(directory);

  useEffect(() => {
    fetchData(import.meta.env.VITE_TREE_URL);
  }, []);

  const handleDirectoryClick = (file) => {
    setDirectory((prev) => {
      return prev + `${file.name}/`;
    });
    fetchData(import.meta.env.VITE_TREE_URL + directory + file.name);
  };

  const handleDirectoryBack = () => {
    // Separa el directorio actual en partes
    const parts = directory.split("/");

    // Elimina la última parte (la carpeta actual) del array de partes
    parts.pop();
    parts.pop();

    // Vuelve a unir las partes para obtener el nuevo directorio
    const newDirectory = parts.join("/");

    // Actualiza el estado directory con el nuevo directorio
    setDirectory(newDirectory);

    // Realiza una nueva solicitud al servidor para cargar la información de la carpeta padre
    fetchData(import.meta.env.VITE_TREE_URL + newDirectory);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length > 1) {
      uploadMultipleFiles(files, setAllClosed, directory);
    } else {
      uploadFile(fileInput, setAllClosed, directory);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Select path</h2>
      <div className={styles.arroWrapper}>
        <img src="arrowBack.png" alt="" onClick={handleDirectoryBack} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <DirectoryList
          data={data}
          handleDirectoryClick={handleDirectoryClick}
        />
      )}
      {error && <h2>Error getting info server</h2>}
      <div className={styles.btnWrapper}>
        <button className={styles.btn} onClick={handleUpload}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default DirectorySelection;

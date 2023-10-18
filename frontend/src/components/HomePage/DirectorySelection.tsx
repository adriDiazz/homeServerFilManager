import { useEffect, useState } from "react";
import styles from "./DirectorySelection.module.css";
import useFetch from "../../hooks/useFetch";
import { uploadFile, uploadMultipleFiles } from "../../services/uploadService";
import Loader from "../ui/Loader";
import DirectoryList from "./DirectoryList";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FileType } from "../../types/files";

interface DirectorySelectionProps {
  name?: string;
  fileInput: File;
  files?: File[];
  setAllClosed: (c: boolean) => void;
}

function DirectorySelection({
  name = "",
  fileInput,
  files = [],
  setAllClosed,
}: DirectorySelectionProps) {
  const { data, error, fetchData, loading } = useFetch<FileType[]>();
  const [directory, setDirectory] = useState("/");

  const notify = () => toast("File uploaded");
  const notifyError = () => toast("Error while uploading");

  useEffect(() => {
    fetchData(import.meta.env.VITE_TREE_URL);
  }, []);

  const handleDirectoryClick = (file: FileType) => {
    setDirectory((prev) => {
      return prev + `${file.name}/`;
    });
    fetchData(import.meta.env.VITE_TREE_URL + directory + file.name);
  };

  const handleDirectoryBack = () => {
    const parts = directory.split("/");

    parts.pop();
    parts.pop();

    const newDirectory = parts.join("/");

    setDirectory(newDirectory);

    fetchData(import.meta.env.VITE_TREE_URL + newDirectory);
  };

  const handleUpload = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (files.length > 1) {
      uploadMultipleFiles(
        files,
        setAllClosed,
        directory,
        notify,
        notifyError,
        name
      );
    } else {
      uploadFile(fileInput, setAllClosed, directory, notify, notifyError, name);
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

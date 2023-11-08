import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./FilesStatsList.module.css";
import FilesTypeList from "./FilesTypeList";
import Loader from "../ui/Loader";

export interface filesTypeResponse {
  documents: string;
  images: string;
  videos: string;
}

const FilesStatsList = () => {
  const { data, fetchData, loading, error } = useFetch<filesTypeResponse>();

  useEffect(() => {
    fetchData(import.meta.env.VITE_FILES_URL);
  }, []);

  return (
    <div className={styles.wrapper}>
      <span className={styles.darkSpan}>File Type</span>
      {loading && !error ? <Loader /> : <FilesTypeList data={data} />}
      {error && <div>Error getting files info</div>}
    </div>
  );
};

export default FilesStatsList;

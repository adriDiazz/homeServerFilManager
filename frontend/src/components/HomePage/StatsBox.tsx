import { useEffect } from "react";
import styles from "./StatsBox.module.css";
import useFetch from "../../hooks/useFetch";
import StorageBar from "./StorageBar";
import { storageResponse } from "../../utils/storageHandler";
import FilesStatsList from "./FilesStatsList";

const StatsBox = () => {
  const { data, error, fetchData, loading } = useFetch<storageResponse>();

  useEffect(() => {
    fetchData(import.meta.env.VITE_STATS_URL);
  }, []);

  return (
    <div className={styles.rightWrapper}>
      {error && <div>Error</div>}
      {loading && !error ? <div>Loading...</div> : <StorageBar data={data} />}
      <FilesStatsList />
    </div>
  );
};

export default StatsBox;

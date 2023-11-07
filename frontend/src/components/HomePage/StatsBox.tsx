import { useEffect } from "react";
import styles from "./StatsBox.module.css";
import useFetch from "../../hooks/useFetch";
import { json } from "react-router-dom";
import StorageBar from "./StorageBar";
import { storageResponse } from "../../utils/storageHandler";

const StatsBox = () => {
  const { data, error, fetchData, loading } = useFetch<storageResponse>();

  useEffect(() => {
    fetchData(import.meta.env.VITE_STATS_URL);
  }, []);

  return (
    <div className={styles.rightWrapper}>
      <StorageBar data={data} />
    </div>
  );
};

export default StatsBox;

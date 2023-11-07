import {
  getStoragePercentage,
  storageResponse,
} from "../../utils/storageHandler";
import styles from "./StorageBar.module.css";

interface StorageBarProps {
  data: storageResponse | null;
}

const MuchSpace = () => {
  return (
    <>
      <div className={styles.first}></div>
      <div className={styles.normal}></div>
      <div className={styles.normal}></div>
    </>
  );
};
const MediumSpace = () => {
  return (
    <>
      <div className={styles.first}></div>
      <div className={styles.second}></div>
      <div className={styles.normal}></div>
    </>
  );
};
const LowSpace = () => {
  return (
    <>
      <div className={styles.first}></div>
      <div className={styles.second}></div>
      <div className={styles.third}></div>
    </>
  );
};

const StorageBar: React.FC<StorageBarProps> = ({ data }) => {
  const storagePercentage = getStoragePercentage(data as storageResponse);

  return (
    <div className={styles.topWrapper}>
      <span className={styles.darkSpan}>Storage</span>
      <div className={styles.wrapper}>
        {storagePercentage > 50 && <LowSpace />}
        {(storagePercentage < 50 && storagePercentage > 40) ||
          (storagePercentage === 50 && <MediumSpace />)}
        {storagePercentage < 40 && <MuchSpace />}
      </div>
      <span className={styles.whiteSpan}>
        <span className={styles.whiteSpan}>{data?.used}</span>/
        <span className={styles.darkSpan}>{data?.total}</span>
      </span>
    </div>
  );
};

export default StorageBar;

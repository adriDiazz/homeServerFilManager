import { selectIcon } from "../../utils/utils";
import { filesTypeResponse } from "./FilesStatsList";
import styles from "./FilesStatsList.module.css";

interface FilesTypeListProps {
  data: filesTypeResponse | null;
}

const FilesTypeList: React.FC<FilesTypeListProps> = ({ data }) => {
  return (
    <div className="">
      <ul className={styles.listWrapper}>
        {data &&
          Object.keys(data).map((key) => {
            const imgSrc = selectIcon(key);
            return (
              <>
                <li
                  className={styles.listItemWrapper}
                  key={crypto.randomUUID()}
                >
                  <div className={styles.listItem}>
                    <img src={imgSrc} alt="" />
                    <span className={styles.whiteSpan}>{key}</span>
                    <span className={styles.whiteSpan}>{data[key]}</span>
                  </div>
                  <div className={styles.line}></div>
                </li>
              </>
            );
          })}
      </ul>
    </div>
  );
};

export default FilesTypeList;

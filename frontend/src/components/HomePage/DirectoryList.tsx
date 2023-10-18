import { DirectoryListProps } from "../../types/props";
import { shortName } from "../../utils/utils";

import styles from "./DirectorySelection.module.css";

const DirectoryList: React.FC<DirectoryListProps> = ({
  data,
  handleDirectoryClick,
}) => {
  return (
    <ul className={styles.listWrapper}>
      {data?.map((file) => {
        return (
          <li key={file.name}>
            {file.isDirectory ? (
              <div
                onClick={() => {
                  handleDirectoryClick(file);
                }}
              >
                <img
                  src="folderBlank.png"
                  alt=""
                  className={styles.folderIcon}
                />
              </div>
            ) : (
              <img src="fileIcon.png" alt="" className={styles.fileIcon} />
            )}
            <span>{shortName(file.name)}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default DirectoryList;

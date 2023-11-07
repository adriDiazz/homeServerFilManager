import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import DragDrop from "../components/HomePage/DragDrop";
import LastFilesTable from "../components/HomePage/LastFilesTable";
import { validateToken } from "../utils/token";
import StatsBox from "../components/HomePage/StatsBox";

const HomePage = () => {
  const { setToken } = useUserContext();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [allClosed, setAllClosed] = useState(false);

  useEffect(() => {
    // Al cargar la página, intenta obtener el token de localStorage
    const storedToken = localStorage.getItem("token");
    const isValid = validateToken(storedToken);
    if (isValid) {
      // Si se encuentra un token en localStorage, actualízalo en el estado del contexto
      setToken(storedToken as string);
    } else {
      // Si no hay un token en localStorage, redirige al usuario a la página de inicio de sesión
      navigate("/login");
    }
  }, [setToken, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={styles.topBar}>
          <h2>Welcome back to KASA</h2>
          <div className={styles.inputWrapper}>
            <img src="search.png" alt="" />
            <input type="text" placeholder="Search your files" />
          </div>
        </div>
        <div className={styles.dragWrapper}>
          <p className={styles.text}>Upload Files</p>
          <DragDrop
            files={files}
            setFiles={setFiles}
            allClosed={allClosed}
            setAllClosed={setAllClosed}
          />
        </div>
        <div className={styles.lastFilesWrapper}>
          <p className={styles.text}>Last files</p>
          <LastFilesTable files={files} allClosed={allClosed} />
        </div>
      </div>
      <div className={styles.right}>
        <StatsBox />
      </div>
    </div>
  );
};

export default HomePage;

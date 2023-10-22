import { useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className={style.wrapper}>
      <div className={style.logoWrapper}>
        <div
          className={style.textWrapper}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="logo.png" alt="" />
          <span>KASA</span>
        </div>
        <img
          src="folderNav.png"
          alt=""
          onClick={() => {
            navigate("files");
          }}
        />
      </div>
    </div>
  );
};

export default NavBar;

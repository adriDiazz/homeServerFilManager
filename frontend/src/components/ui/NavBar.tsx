import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logoWrapper}>
        <img src="logo.png" alt="" />
        <span>KASA</span>
      </div>
    </div>
  );
};

export default NavBar;

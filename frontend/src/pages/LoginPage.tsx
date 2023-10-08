import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <h2>Sing in to</h2>
        <h3>Kasa server</h3>
        <p>If dont have an account ask the admin</p>
      </div>

      <div className={styles.formWrapper}>
        <span>Sing In</span>
        <form action="">
          <input type="text" placeholder="Username" />
          <input type="password" name="" id="" placeholder="Password" />
          <p className={styles.fp}>Forgot Password?</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Log In{" "}
          </button>
        </form>
      </div>
      <img src="Saly-14.png" alt="" />
    </div>
  );
};

export default LoginPage;

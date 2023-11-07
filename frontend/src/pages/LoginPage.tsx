import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import { LoginForm, LoginResponse } from "../types/form";
import useFetch from "../hooks/useFetch";
import { useUserContext } from "../context/UserContext";
import { validateToken } from "../utils/token";

const LoginPage = () => {
  const navigate = useNavigate();
  const { data, error, fetchData } = useFetch<LoginResponse>();
  const { setToken, setUser, token } = useUserContext();
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isValid = validateToken(storedToken);
    if (isValid) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData(import.meta.env.VITE_LOGIN_URL, "POST", formData);
    localStorage.setItem("token", data?.token || "");
    setToken(data?.token);
    setUser(data?.user);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.textWrapper}>
        <h2>Sign in to</h2>
        <h3>Kasa server</h3>
        <p>If dont have an account ask the admin</p>
      </div>

      <div className={styles.formWrapper}>
        <span>Sign In</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className={styles.fp}>Forgot Password?</p>
          {error && <p>Error login in </p>}
          <button type="submit">Log In</button>
        </form>
      </div>
      <img src="Saly-14.png" alt="" />
    </div>
  );
};

export default LoginPage;

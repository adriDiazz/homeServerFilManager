import styles from "./Button.module.css";

const Button = ({ className = "", ...props }) => {
  return (
    <button {...props} className={`${styles.btn} ${className || ""}`}></button>
  );
};

export default Button;

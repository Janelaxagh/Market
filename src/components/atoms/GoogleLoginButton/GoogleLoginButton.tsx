import { FC } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { IGoogleLoginButtonProps } from "./GoogleLoginButton.interface";
import styles from "./GoogleLoginButton.module.scss";

const GoogleLoginButton: FC<IGoogleLoginButtonProps> = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <button className={styles.googleLoginButton} onClick={() => login()}>
      <span className={styles.icon} />
    </button>
  );
};

export default GoogleLoginButton;

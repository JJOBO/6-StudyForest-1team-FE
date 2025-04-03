import { toast } from "react-toastify";
import styles from "./PasswordToast.module.scss";

// 비밀번호 인증 실패 토스트
export const showErrorToast = () => {
  toast.warning("🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.", {
    autoClose: false,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: `${styles.toast} ${styles.toastWarning}`,
  });
};

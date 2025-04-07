import { toast } from "react-toastify";
import styles from "./StudyToast.module.scss";

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

// 링크 복사 성공 토스트
export const showLinkCopiedToast = () => {
  toast.success("📎 링크가 클립보드에 복사되었습니다.", {
    autoClose: 1500,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: `${styles.toast} ${styles.toastSuccess}`,
  });
};

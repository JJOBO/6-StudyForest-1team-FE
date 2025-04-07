import { toast } from "react-toastify";
import styles from "./FocusToast.module.scss";

let warningToastId;

// 집중 일시 중단 알림
export const showPauseToast = () => {
  warningToastId = toast.warning("🚨 집중이 중단되었습니다.", {
    autoClose: false,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: `${styles.toast} ${styles.toastWarning}`,
  });
};

// 포인트 획득 알림
export const showPointToast = (points) => {
  toast.success(`🎉 ${points}포인트를 획득했습니다!`, {
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    icon: false,
    className: `${styles.toast} ${styles.toastPoint}`,
  });
};

export const dismissPauseToast = () => {
  toast.dismiss(warningToastId); // 일시정지 토스트만 닫기
};

import React from "react";
import styles from "./LinkButton.module.scss";
import arrowIcon from "../../assets/icons/ic_arrow_right.svg";

function LinkButton({ type, onClick }) {
  const renderContent = () => {
    switch (type) {
      case "habit":
        return (
          <button className={styles.linkButton} onClick={onClick}>
            오늘의 습관
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
      case "focus":
        return (
          <button className={styles.linkButton} onClick={onClick}>
            오늘의 집중
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
      default:
        return (
          <button className={styles.linkButton} onClick={onClick}>
            홈
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
    }
  };

  return <nav>{renderContent()}</nav>;
}

export default LinkButton;

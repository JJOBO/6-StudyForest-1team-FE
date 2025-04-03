import React from "react";
import styles from "./LinkButton.module.scss";
import arrowIcon from "../../assets/icons/ic_arrow_right.svg";

function LinkButton({ type, onClick }) {
  const renderContent = () => {
    switch (type) {
      case "home":
        return (
          <button className={styles.homeButton} onClick={onClick}>
            홈
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
      case "habit":
        return (
          <button className={styles.habitButton} onClick={onClick}>
            오늘의 습관
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
      case "focus":
        return (
          <button className={styles.focusButton} onClick={onClick}>
            오늘의 집중
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
      default:
        return (
          <button className={styles.homeButton} onClick={onClick}>
            홈
            <img src={arrowIcon} alt="arrow" className={styles.arrowIcon} />
          </button>
        );
    }
  };

  return <div>{renderContent()}</div>;
}

export default LinkButton;

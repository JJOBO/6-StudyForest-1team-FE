import React from "react";
import styles from "./PointDisplay.module.scss";

const PointDisplay = ({ totalPoints }) => {
  return (
    <div className={styles.points}>
      <span>현재까지 획득한 포인트: {totalPoints}P</span>
    </div>
  );
};

export default PointDisplay;

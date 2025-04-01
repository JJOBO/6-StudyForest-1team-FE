import React from "react";
import styles from '../../../pages/FocusPage.module.scss';
import pointIcon from "../../../assets/icons/ic_point.svg"

const PointDisplay = ({ totalPoints }) => {
  return (
      <div className={styles.pointContainer}>
        <p className={styles.pointTxt}>현재까지 획득한 포인트</p>
        <div className={styles.point}>
          <img src= {pointIcon} alt="포인트" />
          <p className={styles.pointTotalTxt}>{totalPoints}P 획득</p>
        </div>
      </div>
    );
  };

export default PointDisplay;
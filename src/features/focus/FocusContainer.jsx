import React from 'react';
import styles from './FocusContainer.module.scss'; // SCSS 파일 import

const FocusContainer = ({ studyInfo }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{studyInfo.name}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.focusButton}>오늘의 습관</button>
        <button className={styles.homeButton}>홈</button>
      </div>
    </div>
  );
};

export default FocusContainer;



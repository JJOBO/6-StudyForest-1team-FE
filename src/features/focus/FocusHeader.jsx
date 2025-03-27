import React from 'react';
import styles from './FocusHeader.module.scss';

const FocusHeader = ({ studyInfo }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{studyInfo.name}</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.focusButton}>오늘의 습관</button>
          <button className={styles.homeButton}>홈</button>
        </div>
      </div>
    </div>
  );
};

export default FocusHeader;

import React from 'react';
import styles from './PointDisplay.module.scss';

const PointDisplay = ({ points }) => {
  return (
    <div className={styles.points}>
      <span>현재까지 획득한 포인트</span>
      <div className={styles.pointsValue}>{points}P 획득</div>
    </div>
  );
};

export default PointDisplay;

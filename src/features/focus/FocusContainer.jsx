import React from 'react';
import { Link, useParams } from 'react-router-dom';
import arrow from "../../assets/icons/ic_arrow_right.svg";
import styles from './FocusContainer.module.scss';

const FocusContainer = ({ studyInfo }) => {
  const { studyId } = useParams(); // studyId를 URL에서 가져오기

  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{studyInfo.name}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/${studyId}/habits`} className={styles.focusButton}>
          오늘의 습관<img src={arrow} alt="arrow" />
        </Link>
        <Link to="/" className={styles.homeButton}>
          홈<img src={arrow} alt="arrow" />
        </Link>
      </div>
    </div>
  );
};

export default FocusContainer;
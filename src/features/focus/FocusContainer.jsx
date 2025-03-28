import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrow from "../../assets/icons/ic_arrow_right.svg";
import styles from './FocusContainer.module.scss';

const FocusContainer = ({ studyInfo }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // studyId를 URL에서 가져오기

  const handleHabitClick = () => {
    navigate(`/study/${id}/habit`);
  };

  const handleHomeClick = () => {
    navigate('/'); // 
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>{studyInfo.name}</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.focusButton} onClick={handleHabitClick}>
          오늘의 습관<img src={arrow} alt="arrow" />
        </button>
        <button className={styles.homeButton} onClick={handleHomeClick}>
          홈<img src={arrow} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default FocusContainer;



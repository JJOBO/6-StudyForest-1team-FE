import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
          오늘의 습관
        </button>
        <button className={styles.homeButton} onClick={handleHomeClick}>
          홈
        </button>
      </div>
    </div>
  );
};

export default FocusContainer;



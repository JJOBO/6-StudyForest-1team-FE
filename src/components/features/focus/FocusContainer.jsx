import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from '../../../pages/FocusPage.module.scss';
import arrow from "../../../assets/icons/ic_arrow_right.svg"
const FocusContainer = ({ studyInfo }) => {
  const { studyId } = useParams(); // studyId를 URL에서 가져오기

  return (
      <div className={styles.header}>
        <h1 className={styles.focusTitle}>{studyInfo.name}</h1>
        <div className={styles.focusBtnContainer}>
          <Link to={`/${studyId}/habits`} className={styles.focusBtn}>
            오늘의 습관
            <img src= {arrow} alt="오른쪽 화살표" />
          </Link>
          <Link to="/" className={styles.focusBtn}>
            <p>홈</p>
            <img src={arrow} alt="오른쪽 화살표" />
          </Link>
        </div>
      </div>
    );
  };

export default FocusContainer;
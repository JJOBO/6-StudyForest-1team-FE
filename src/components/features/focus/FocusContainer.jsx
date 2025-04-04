import React from "react";
import { Link, useParams } from "react-router-dom";
import arrow from "../../../assets/icons/ic_arrow_right.svg";
import styles from "./FocusContainer.module.scss";
import LinkButton from "../../common/LinkButton";
import { useNavigate } from "react-router-dom";

const FocusContainer = ({ studyInfo }) => {
  const { studyId } = useParams(); // studyId를 URL에서 가져오기
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1>
          {studyInfo.creatorNick}의 {studyInfo.name}
        </h1>
      </div>
      <div className={styles.btnContainer}>
        <LinkButton
          type="habit"
          onClick={() => {
            navigate(`/${studyId}/habits`);
          }}
        />
        <LinkButton
          type="home"
          onClick={() => {
            navigate(`/${studyId}`);
          }}
        />
      </div>
    </div>
  );
};

export default FocusContainer;

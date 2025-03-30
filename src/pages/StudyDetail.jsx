import React from "react";
import "./StudyDetail.scss";
import { Link, useParams } from "react-router-dom";
import GNB from "../components/common/Header";

function StudyDetail() {
  const { studyId } = useParams();

  return (
    <div className="study-detail-container">
      <GNB isButtonDisabled={true} />
      <div className="study-detail-buttons">
        <Link to={`/${studyId}/focus`}>
          <button className="focus-button">오늘의 집중</button>
        </Link>
        <Link to={`/${studyId}/habits`}>
          <button className="habit-button">오늘의 습관</button>
        </Link>
      </div>
    </div>
  );
}

export default StudyDetail;

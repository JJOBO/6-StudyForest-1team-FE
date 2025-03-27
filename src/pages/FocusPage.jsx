import React from "react";
import { useParams } from "react-router-dom";
import FocusTimer from "../features/focus/FocusTimer";

const FocusPage = ({ userTotalPoints }) => {
  const { studyId } = useParams();

  return (
    <div>
      <FocusTimer studyId={studyId} userTotalPoints={userTotalPoints} />
    </div>
  );
};

export default FocusPage;

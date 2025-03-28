import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import focusAPI from "../features/focus/focusAPI.js";
import GNB from "../components/GlobalNavigationBar";
import FocusContainer from "../features/focus/FocusContainer";
import PointDisplay from "../features/focus/PointDisplay";
import FocusTimer from "../features/focus/FocusTimer";
import "./FocusPage.scss";

const FocusPage = () => {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await focusAPI.getStudyInfo(id);
        setStudyInfo(data);
        setPoints(data.points);
      } catch (e) {
        console.error("Error fetching study info:", e);
      }
    };

    fetchData();
  }, [id]);

  if (!studyInfo) return <div>Loading...</div>;

  return (
    <div className="focus-page">
      <GNB isButtonDisabled={true} />
      <div className="focus-container">
        <FocusContainer studyInfo={studyInfo} />
        <PointDisplay points={points} />
        <FocusTimer userTotalPoints={points} />
      </div>
    </div>
  );
};

export default FocusPage;

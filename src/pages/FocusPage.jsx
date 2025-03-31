import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import focusAPI from "../features/focus/focusAPI.js";
import FocusContainer from "../features/focus/FocusContainer";
import FocusTimer from "../features/focus/FocusTimer";
import PointDisplay from "../features/focus/PointDisplay";
import "./FocusPage.scss";

const FocusPage = () => {
  const { studyId } = useParams();
  const [studyInfo, setStudyInfo] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await focusAPI.getStudyInfo(studyId);
        setStudyInfo(data);
        setTotalPoints(data.totalPoints);
      } catch (e) {
        console.error("Error fetching study info:", e);
      }
    };

    fetchData();
  }, [studyId]);

  if (!studyInfo) return <div>Loading...</div>;

  return (
    <div className="focus-page">
      <Header isButtonDisabled={true} />
      <div className="focus-container">
        <FocusContainer studyInfo={studyInfo} />
        <PointDisplay totalPoints={totalPoints} />
        <FocusTimer totalPoints={totalPoints} setTotalPoints={setTotalPoints} />
      </div>
    </div>
  );
};

export default FocusPage;

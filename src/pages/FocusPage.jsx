import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 파라미터 사용 시 필요
import focusAPI from "../features/focus/focusAPI.js"; // API 호출
import GNB from "../components/GlobalNavigationBar"; // 네비게이션 바
import FocusContainer from '../features/focus/FocusContainer'; // 제목과 버튼 컴포넌트
import PointDisplay from '../features/focus/PointDisplay'; // 포인트 표시 컴포넌트
import './FocusPage.scss'; // 전체 스타일

const FocusPage = () => {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await focusAPI.getStudyInfo(id); // 객체에서 메서드 호출
        setStudyInfo(data);
        setPoints(data.points);
      } catch (e) {
        console.error('Error fetching study info:', e); // 오류 처리
      }
    };

    fetchData();
  }, [id]);

  if (!studyInfo) return <div>Loading...</div>; // studyInfo가 없으면 로딩 화면 표시

  return (
    <div className="focus-page">
      <GNB isButtonDisabled={true} />
      <div className="focus-container">
        <FocusContainer studyInfo={studyInfo} />
        <PointDisplay points={points} />
        <div className="timer-container">
          <div className="timer">25:00</div>
          <button className="start-button">Start!</button>
        </div>
      </div>
    </div>
  );
};

export default FocusPage;


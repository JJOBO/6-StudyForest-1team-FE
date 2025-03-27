import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // 파라미터 사용 시 필요
import focusAPI from "../features/focus/focusAPI.js"; // API 호출
import FocusHeader from '../features/focus/FocusHeader'; // 헤더 컴포넌트
import PointDisplay from '../features/focus/PointDisplay'; // 포인트 표시 컴포넌트
import './FocusPage.scss';  // 전체 스타일


const FocusPage = () => {
  const { id } = useParams();
  const [studyInfo, setStudyInfo] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await focusAPI.getStudyInfo(id); // ✅ 객체에서 메서드 호출
        setStudyInfo(data);
        setPoints(data.points);
      } catch (error) {
        console.error('Error fetching study info:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!studyInfo) return <div>Loading...</div>;

  return (
    <div className="focus-page">
      <FocusHeader studyInfo={studyInfo} />
      <PointDisplay points={points} />
    </div>
  );
};

export default FocusPage;

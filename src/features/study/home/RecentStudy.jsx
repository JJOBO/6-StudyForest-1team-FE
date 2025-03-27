import React from "react";
import "./RecentStudy.css";
import StudyCard from "../../../components/StudyCard";

function RecentStudy() {
  const calculateDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="recent-study">
      <h2>최근 조회한 스터디</h2>
      <div className="study-cards">
        {studyData.map((study) => (
          <StudyCard
            key={study.id}
            {...study}
            calculateDays={calculateDays} // 함수 전달
          />
        ))}
      </div>
    </div>
  );
}

const studyData = [
  {
    id: 1,
    name: "이유미의 UX 스터디",
    description: "Slow And Steady Wins The Race!!",
    createdAt: "2025-10-01",
    points: 310,
    emojis: [
      { type: "❤️", count: 37 },
      { type: "💬", count: 26 },
      { type: "🔖", count: 14 },
    ],
    image: "/images/study1.png",
  },
  {
    id: 2,
    name: "K.K.의 UX 스터디",
    description: "나비보벳따우",
    createdAt: "2024-09-25",
    points: 310,
    emojis: [
      { type: "❤️", count: 42 },
      { type: "💬", count: 18 },
      { type: "🔖", count: 20 },
    ],
    image: "/images/study2.png",
  },
  {
    id: 3,
    name: "연우 의 개발공장",
    description: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
    createdAt: "2023-09-20",
    points: 50,
    emojis: [
      { type: "❤️", count: 32 },
      { type: "💬", count: 11 },
      { type: "🔖", count: 9 },
    ],
    image: "/images/study3.png",
  },
];

export default RecentStudy;

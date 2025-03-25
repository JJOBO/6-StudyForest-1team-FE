import React, { useState } from "react";
import "./StudyContents.css";

function StudyCard({ title, description, image, points }) {
  return (
    <div className="study-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{points} Points</span>
    </div>
  );
}

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "아워팀의 UX 스터디",
      description: "Slow And Steady Wins The Race!",
      image: "/images/study1.png",
      points: 37,
    },
    {
      id: 2,
      title: "K.K.의 UX 스터디",
      description: "나비는벗따우",
      image: "/images/study2.png",
      points: 31,
    },
    {
      id: 3,
      title: "연우의 개발광장",
      description: "오늘 하루도 화이팅 :)",
      image: "/images/study3.png",
      points: 12,
    },
  ]);

  const handleLoadMore = () => {
    // 카드 추가 로직
    setCards((prevCards) => [
      ...prevCards,
      {
        id: prevCards.length + 1,
        title: "새로운 스터디",
        description: "추가된 스터디 카드입니다.",
        image: "/images/study4.png",
        points: 20,
      },
    ]);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    // 정렬 로직은 API 통합 후 구현
  };

  return (
    <div className="study-contents">
      <div className="search-bar">
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="sort-dropdown">
        <button>{sortOption}</button>
        <ul>
          {["최근 순", "오래된 순", "많은 포인트 순", "적은 포인트 순"].map(
            (option) => (
              <li key={option} onClick={() => handleSortChange(option)}>
                {option}
              </li>
            )
          )}
        </ul>
      </div>
      <div className="study-cards">
        {cards.map((card) => (
          <StudyCard key={card.id} {...card} />
        ))}
      </div>
      <button className="load-more" onClick={handleLoadMore}>
        더보기
      </button>
    </div>
  );
}

export default StudyContents;

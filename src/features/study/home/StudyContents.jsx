import React, { useState } from "react";
import StudyCard from "../../../components/StudyCard"; // Import the shared StudyCard component
import "./StudyContents.css";

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "아워팀의 UX 스터디",
      description: "Slow And Steady Wins The Race!",
      image: "/images/study1.png",
      points: 37,
      createdAt: "2023-01-01",
      emojis: [
        { type: "👍", count: 10 },
        { type: "❤️", count: 5 },
      ],
    },
    {
      id: 2,
      name: "K.K.의 UX 스터디",
      description: "나비는벗따우",
      image: "/images/study2.png",
      points: 31,
      createdAt: "2023-02-01",
      emojis: [
        { type: "👍", count: 8 },
        { type: "❤️", count: 3 },
      ],
    },
    {
      id: 3,
      name: "연우의 개발광장",
      description: "오늘 하루도 화이팅 :)",
      image: "/images/study3.png",
      points: 12,
      createdAt: "2023-03-01",
      emojis: [
        { type: "👍", count: 5 },
        { type: "❤️", count: 2 },
      ],
    },
    {
      id: 4,
      name: "아워팀의 UX 스터디",
      description: "Slow And Steady Wins The Race!",
      image: "/images/study1.png",
      points: 37,
      createdAt: "2023-01-01",
      emojis: [
        { type: "👍", count: 10 },
        { type: "❤️", count: 5 },
      ],
    },
    {
      id: 5,
      name: "K.K.의 UX 스터디",
      description: "나비는벗따우",
      image: "/images/study2.png",
      points: 31,
      createdAt: "2023-02-01",
      emojis: [
        { type: "👍", count: 8 },
        { type: "❤️", count: 3 },
      ],
    },
    {
      id: 6,
      name: "연우의 개발광장",
      description: "오늘 하루도 화이팅 :)",
      image: "/images/study3.png",
      points: 12,
      createdAt: "2023-03-01",
      emojis: [
        { type: "👍", count: 5 },
        { type: "❤️", count: 2 },
      ],
    },
    {
      id: 7,
      name: "아워팀의 UX 스터디",
      description: "Slow And Steady Wins The Race!",
      image: "/images/study1.png",
      points: 37,
      createdAt: "2023-01-01",
      emojis: [
        { type: "👍", count: 10 },
        { type: "❤️", count: 5 },
      ],
    },
    {
      id: 8,
      name: "K.K.의 UX 스터디",
      description: "나비는벗따우",
      image: "/images/study2.png",
      points: 31,
      createdAt: "2023-02-01",
      emojis: [
        { type: "👍", count: 8 },
        { type: "❤️", count: 3 },
      ],
    },
    {
      id: 9,
      name: "연우의 개발광장",
      description: "오늘 하루도 화이팅 :)",
      image: "/images/study3.png",
      points: 12,
      createdAt: "2023-03-01",
      emojis: [
        { type: "👍", count: 5 },
        { type: "❤️", count: 2 },
      ],
    },
    {
      id: 10,
      name: "새로운 스터디 1",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study4.png",
      points: 25,
      createdAt: "2023-04-01",
      emojis: [
        { type: "👍", count: 7 },
        { type: "❤️", count: 4 },
      ],
    },
    {
      id: 11,
      name: "새로운 스터디 2",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study5.png",
      points: 18,
      createdAt: "2023-05-01",
      emojis: [
        { type: "👍", count: 6 },
        { type: "❤️", count: 3 },
      ],
    },
    {
      id: 12,
      name: "새로운 스터디 3",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study6.png",
      points: 45,
      createdAt: "2023-06-01",
      emojis: [
        { type: "👍", count: 12 },
        { type: "❤️", count: 6 },
      ],
    },
    {
      id: 13,
      name: "새로운 스터디 4",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study7.png",
      points: 30,
      createdAt: "2023-07-01",
      emojis: [
        { type: "👍", count: 9 },
        { type: "❤️", count: 4 },
      ],
    },
    {
      id: 14,
      name: "새로운 스터디 5",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study8.png",
      points: 22,
      createdAt: "2023-08-01",
      emojis: [
        { type: "👍", count: 7 },
        { type: "❤️", count: 3 },
      ],
    },
    {
      id: 15,
      name: "새로운 스터디 6",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study9.png",
      points: 35,
      createdAt: "2023-09-01",
      emojis: [
        { type: "👍", count: 10 },
        { type: "❤️", count: 5 },
      ],
    },
    {
      id: 16,
      name: "새로운 스터디 7",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study10.png",
      points: 40,
      createdAt: "2023-10-01",
      emojis: [
        { type: "👍", count: 11 },
        { type: "❤️", count: 6 },
      ],
    },
    {
      id: 17,
      name: "새로운 스터디 8",
      description: "새로운 스터디 카드입니다.",
      image: "/images/study11.png",
      points: 28,
      createdAt: "2023-11-01",
      emojis: [
        { type: "👍", count: 8 },
        { type: "❤️", count: 4 },
      ],
    },
  ]);
  const [visibleCount, setVisibleCount] = useState(6);

  const calculateDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    // 정렬 로직은 API 통합 후 구현
  };

  return (
    <div className="study-contents">
      <h2>스터디 둘러보기</h2>
      <div className="option-bar">
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
      </div>

      <div className="study-cards">
        {cards.slice(0, visibleCount).map((card) => (
          <StudyCard key={card.id} {...card} calculateDays={calculateDays} />
        ))}
      </div>
      {visibleCount < cards.length && (
        <button className="load-more" onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyContents;

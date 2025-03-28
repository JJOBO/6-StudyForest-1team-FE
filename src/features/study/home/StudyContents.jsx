import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import "./StudyContents.css";
import StudyCard from "../../../components/StudyCard";

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await studyAPI.getStudyList(
          searchTerm,
          sortOption,
          offset
        );
        setCards((prevCards) => [...prevCards, ...data.studies]);
        setTotal(data.total);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, [searchTerm, sortOption, offset]);

  const handleLoadMore = () => {
    if (cards.length < total) {
      setOffset((prevOffset) => prevOffset + 6);
    }
  };

  const handleSortChange = (option) => {
    setCards([]);
    setOffset(0);
    switch (option) {
      case "최근 순":
        setSortOption("createdAt");
        break;
      case "오래된 순":
        setSortOption("oldest");
        break;
      case "많은 포인트 순":
        setSortOption("totalPointsDesc");
        break;
      case "적은 포인트 순":
        setSortOption("totalPointsAsc");
        break;
      default:
        setSortOption("createdAt");
    }
  };

  const calculateDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const diffTime = Math.abs(today - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        <button>
          {
            {
              createdAt: "최근 순",
              oldest: "오래된 순",
              totalPointsDesc: "많은 포인트 순",
              totalPointsAsc: "적은 포인트 순",
            }[sortOption]
          }
        </button>
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
          <StudyCard
            key={card.id}
            name={card.name}
            description={card.description}
            image={card.background}
            points={card.totalPoints}
            createdAt={card.createdAt}
            emojis={card.emojis}
            calculateDays={calculateDays}
          />
        ))}
      </div>
      {cards.length < total && (
        <button className="load-more" onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyContents;

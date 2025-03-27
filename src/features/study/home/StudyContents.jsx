import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import "./StudyContents.css";

function StudyCard({ title, description, image, points, emojis }) {
  return (
    <div className="study-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{points} Points</span>
      <div className="study-card-emojis">
        {emojis.map((emoji, index) => (
          <span key={index}>
            {emoji.emoji} {emoji.count}
          </span>
        ))}
      </div>
    </div>
  );
}

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
            title={card.name}
            description={card.description}
            image={card.background}
            points={card.totalPoints}
            emojis={card.emojis}
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

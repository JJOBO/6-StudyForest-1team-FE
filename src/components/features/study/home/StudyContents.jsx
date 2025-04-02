import React, { useState, useEffect } from "react";
import studyAPI from "../studyAPI";
import styles from "./StudyContents.module.scss";
import StudyCard from "./StudyCard";
import { Link } from "react-router-dom";
import searchIcon from "../../../../../src/assets/icons/ic_search.svg";

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // 실제 검색에 사용될 쿼리

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await studyAPI.getStudyList(
          searchQuery, // searchQuery 사용
          sortOption,
          offset
        );
        setCards((prevCards) =>
          offset === 0 ? [...data.studies] : [...prevCards, ...data.studies]
        );
        setTotal(data.total);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    // searchQuery가 변경될 때만 fetchStudies 실행
    if (searchQuery !== "" || offset > 0) {
      fetchStudies();
    } else if (offset === 0) {
      fetchStudies();
    }
  }, [searchQuery, sortOption, offset]);

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

  // 엔터 키를 눌렀을 때 검색을 실행하는 함수
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setCards([]); // 검색 시 기존 카드 초기화
      setOffset(0); // 검색 시 offset 초기화
      setSearchQuery(searchTerm); // 실제 검색 쿼리 업데이트
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div className={styles.studyContents}>
      <h2 className={styles.title}>스터디 둘러보기</h2>
      <div className={styles.optionBar}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <img src={searchIcon} alt="searchIcon" />
          </div>
          <input
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress} // 엔터 키 이벤트 핸들러 추가
            className={styles.searchInput}
          />
        </div>
        <div className={styles.sortDropdown}>
          <button className={styles.sortButton}>
            {
              {
                createdAt: "최근 순",
                oldest: "오래된 순",
                totalPointsDesc: "많은 포인트 순",
                totalPointsAsc: "적은 포인트 순",
              }[sortOption]
            }
          </button>
          <ul className={styles.sortList}>
            {["최근 순", "오래된 순", "많은 포인트 순", "적은 포인트 순"].map(
              (option) => (
                <li
                  key={option}
                  onClick={() => handleSortChange(option)}
                  className={styles.sortItem}
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className={styles.studyCards}>
        {cards.map((card) => (
          <Link
            to={`/${card.id}`}
            key={card.id}
            className={styles.studyCardLink}
          >
            <StudyCard
              name={card.name}
              description={card.description}
              image={card.background}
              points={card.totalPoints}
              createdAt={card.createdAt}
              emojis={card.emojis}
              background={card.background}
              calculateDays={calculateDays}
              creatorNick={card.creatorNick}
            />
          </Link>
        ))}
      </div>
      {cards.length < total && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default StudyContents;

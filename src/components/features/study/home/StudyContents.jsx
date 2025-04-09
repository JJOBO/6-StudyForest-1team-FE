import React, { useState, useEffect, useCallback } from "react";
import studyAPI from "../studyAPI";
import styles from "./StudyContents.module.scss";
import StudyCard from "./StudyCard";
import { Link } from "react-router-dom";
import searchIcon from "../../../../../src/assets/icons/ic_search.svg";
import SortDropdown from "../../../common/SortDropdown";

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 정렬 변경 함수
  const handleSortChange = useCallback((newSortOption) => {
    setCards([]);
    setOffset(0);
    setSortOption(newSortOption);
  }, []);

  // 더보기 실행 함수
  const handleLoadMore = useCallback(() => {
    if (cards.length < total) {
      setOffset((prevOffset) => prevOffset + 6);
    }
  }, [cards.length, total]);

  // 데이터 패칭 함수
  const fetchStudies = useCallback(async () => {
    if (offset === 0) setIsInitialLoading(true);
    setError(null);

    try {
      const data = await studyAPI.getStudyList(searchQuery, sortOption, offset);

      setCards((prevCards) =>
        offset === 0 ? [...data.studies] : [...prevCards, ...data.studies]
      );
      setTotal(data.total);
    } catch (err) {
      setError(err);
    } finally {
      setIsInitialLoading(false);
    }
  }, [searchQuery, sortOption, offset]);

  // API 호출 useEffect
  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  if (isInitialLoading) return;
  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

  return (
    <section className={styles.studyContents}>
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
            onKeyDown={handleKeyPress}
            className={styles.searchInput}
          />
        </div>

        <SortDropdown sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      <ul className={styles.studyCards}>
        {cards.map((card) => (
          <li key={card.id} className={styles.studyCardLink}>
            <Link to={`/${card.id}`}>
              <article className={styles.studyCardContainer}>
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
                  isRecent={false} // isRecent prop을 false로 설정
                />
              </article>
            </Link>
          </li>
        ))}
      </ul>

      {cards.length < total && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMore} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default StudyContents;

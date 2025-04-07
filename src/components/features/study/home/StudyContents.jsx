import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import studyAPI from "../studyAPI";
import styles from "./StudyContents.module.scss";
import StudyCard from "./StudyCard";
import { Link } from "react-router-dom";
import searchIcon from "../../../../../src/assets/icons/ic_search.svg";

// 정렬 드롭다운 컴포넌트를 분리하여 메모이제이션
const SortDropdown = memo(({ sortOption, onSortChange }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  // 드롭다운 외부 클릭 핸들러
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target && sortRef.current && !sortRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortSelect = useCallback((option) => {
    let newSortOption;
    switch (option) {
      case "최근 순":
        newSortOption = "createdAt";
        break;
      case "오래된 순":
        newSortOption = "oldest";
        break;
      case "많은 포인트 순":
        newSortOption = "totalPointsDesc";
        break;
      case "적은 포인트 순":
        newSortOption = "totalPointsAsc";
        break;
      default:
        newSortOption = "createdAt";
    }

    if (newSortOption != sortOption) {
      onSortChange(newSortOption);
    }
  }, []);

  const label = useMemo(() => {
    return {
      createdAt: "최근 순",
      oldest: "오래된 순",
      totalPointsDesc: "많은 포인트 순",
      totalPointsAsc: "적은 포인트 순",
    }[sortOption];
  }, [sortOption]);

  const options = ["최근 순", "오래된 순", "많은 포인트 순", "적은 포인트 순"];

  return (
    <div className={styles.sortDropdown} ref={sortRef}>
      <button
        className={styles.sortButton}
        onClick={() => setIsSortOpen((prev) => !prev)}
      >
        <span className={styles.sortLabel}>{label}</span>
        <span className={styles.sortIcon}></span>
      </button>
      {isSortOpen && (
        <ul className={styles.sortList}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSortSelect(option)}
              className={styles.sortItem}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

function StudyContents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoadingMoreRef = useRef(false);

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
    if (cards.length < total && !isLoadingMoreRef.current) {
      isLoadingMoreRef.current = true;
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
      isLoadingMoreRef.current = false;
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
            onKeyDown={handleKeyPress}
            className={styles.searchInput}
          />
        </div>

        <SortDropdown sortOption={sortOption} onSortChange={handleSortChange} />
      </div>

      <div className={styles.studyCards}>
        {cards.map((card) => (
          <Link
            to={`/${card.id}`}
            key={card.id}
            className={styles.studyCardLink}
          >
            <div className={styles.studyCardContainer}>
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
            </div>
          </Link>
        ))}
      </div>

      {cards.length < total && (
        <div className={styles.loadMoreWrapper}>
          <button className={styles.loadMore} onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyContents;

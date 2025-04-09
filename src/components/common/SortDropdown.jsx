import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./SortDropdown.module.scss";

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

export default SortDropdown;

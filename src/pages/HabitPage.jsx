import { Link } from "react-router-dom";
import arrow from "../assets/icons/ic_arrow_right.svg";
import "./HabitPage.scss";

const HabitPage = () => {
  return (
    <div className="habit-container">
      <nav className="habit-nav">
        <div className="habit-top-nav">
          <div className="habit-study-title">연우의 개발공장</div>
          <div className="habit-btns">
            <button className="habit-btn">
              오늘의 집중
              <img src={arrow} />
            </button>
            <Link to="/">
              <button className="habit-btn">홈<img src={arrow} /></button>
            </Link>
          </div>
        </div>
        <div className="habit-time">
          <span className="current-text">현재 시간</span>
          <span className="current-time">2024-03-25 오후 3:06</span>
        </div>
      </nav>

      <section className="habit-section">
        <div className="habit-bar">
          <div className="habit-title">오늘의 습관</div>
          <button className="edit-btn">목록 수정</button>
        </div>
        <div className="habit-list">
          <button className="active">미라클 모닝 6시 기상</button>
          <button className="active">미라클 모닝 6시 기상</button>
          <button className="inactive">미라클 모닝 6시 기상</button>
          <button className="inactive">미라클 모닝 6시 기상</button>
          <button className="inactive">미라클 모닝 6시 기상</button>
          <button className="inactive">미라클 모닝 6시 기상</button>
          <button className="inactive">미라클 모닝 6시 기상</button>
        </div>
      </section>
    </div>
  );
};

export default HabitPage;

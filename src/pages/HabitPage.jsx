import { Link } from "react-router-dom";
import "./HabitPage.scss";

export default function HabitPage() {
  return (
    <div className="container">
      <nav className="nav">
        <div className="studyName">연우의 개발공장</div>
        <div className="link">
          <button>오늘의 집중</button>
          <Link to="/">
            <button>홈</button>
          </Link>
        </div>
        <div className="currentTime">
          <div className="text">현재 시간</div>
          <div className="tag">2024-03-25</div>
        </div>
      </nav>
      <section className="section">
        <div className="habitBar">
          <div className="habitTitle">오늘의 습관</div>
          <button className="editBtn">목록 수정</button>
        </div>
        <div className="habitList">
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
}

import { Link } from "react-router-dom";
import "./HabitPage.scss";
import FormatDate from "../components/ui/FormatDate";
import HabitList from "../features/habit/HabitList";
import { useEffect, useState } from "react";
import { getHabitList } from "../features/habit/habitAPI";
import HabitModal from "../features/habit/HabitModal";

export default function HabitPage() {
  const [habits, setHabits] = useState([]);
  const studyId = 1;

  const fetchHabits = async () => {
    const data = await getHabitList(studyId);
    setHabits(data || []);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div className="container">
      <nav className="nav">
        <div className="study-name">연우의 개발공장</div>
        <div className="link">
          <button>오늘의 집중</button>
          <Link to="/">
            <button>홈</button>
          </Link>
        </div>
        <div className="current-time">
          <div className="text">현재 시간</div>
          <div className="tag">
            <FormatDate />
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="habit-bar">
          <div className="habit-title">오늘의 습관</div>
          <button className="edit-btn">목록 수정</button>
        </div>
        <HabitModal habits={habits} />
        <div className="habit-list">
          {habits.length > 0 ? (
            habits.map((habit) => <HabitList key={habit.id} habit={habit} />)
          ) : (
            <p>
              아직 습관이 없어요
              <br />
              목록 수정을 눌러서 습관을 생성해 보세요
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

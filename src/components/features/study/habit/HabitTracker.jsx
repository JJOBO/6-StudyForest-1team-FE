import React, { useEffect, useState } from "react";
import styles from "./HabitTracker.module.scss";
import HabitRow from "./HabitRow";
import habitAPI from "../../habit/habitAPI";

function HabitTracker({ studyId }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [weeklyHabits, setWeeklyHabits] = useState([]);

  useEffect(() => {
    const getWeeklyHabits = async () => {
      try {
        const habits = await habitAPI.getCheckedHabits(studyId);
        setWeeklyHabits(habits);
      } catch (error) {
        console.error("습관 주간 데이터 불러오기 실패", error);
      }
    };
    getWeeklyHabits();
  }, [studyId]);

  return (
    <div className={styles.habitTrackerContainer}>
      <div className={styles.title}>습관 기록표</div>
      <div className={styles.habitTrackerContent}>
        <div></div>
        <div className={styles.days}>
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        {weeklyHabits.map((habit) => (
          <HabitRow
            key={habit.habitId}
            habitName={habit.name}
            records={habit.records}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitTracker;

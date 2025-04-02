import React, { useEffect, useState } from "react";
import styles from "./HabitTracker.module.scss";
import HabitRow from "./HabitRow";
import habitAPI from "../../habit/habitAPI";
import { useHabit } from "./HabitContext";

function HabitTracker({ studyId }) {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const [weeklyHabits, setWeeklyHabits] = useState([]);
  const { refreshKey } = useHabit();

  useEffect(() => {
    const getWeeklyHabits = async () => {
      try {
        const habits = await habitAPI.getCheckedHabits(studyId);
        const sortedHabits = habits.sort((a, b) => a.habitId - b.habitId);
        setWeeklyHabits(sortedHabits);
      } catch (error) {
        console.error("습관 주간 데이터 불러오기 실패", error);
      }
    };
    getWeeklyHabits();
  }, [studyId, refreshKey]);

  return (
    <div className={styles.habitTrackerContainer}>
      {weeklyHabits.length > 0 ? (
        <>
          <div className={styles.title}>습관 기록표</div>
          <div className={styles.habitTrackerContent}>
            <div></div>
            <div className={styles.days}>
              {days.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            {weeklyHabits.map((habit, index) => (
              <HabitRow
                key={habit.habitId}
                habitName={habit.name}
                records={habit.records}
                stickerIndex={index}
              />
            ))}
          </div>
        </>
      ) : (
        <p>
          아직 습관이 없어요
          <br />
          오늘의 습관에서 습관을 생성해 보세요
        </p>
      )}
    </div>
  );
}

export default HabitTracker;

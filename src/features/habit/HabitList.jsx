import "./HabitList.scss";

function HabitList({ habit }) {
  return (
    <button className={habit.isActive ? "active" : "inactive"}>
      {habit.name}
    </button>
  );
}

export default HabitList;

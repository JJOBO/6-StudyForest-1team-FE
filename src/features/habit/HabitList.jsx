import "./HabitList.scss";

function HabitList({ habit, overrideClassName }) {
  const className =
    overrideClassName ?? (habit.isActive ? "active" : "inactive");

  return <button className={className}>{habit.name}</button>;
}

export default HabitList;

import React from "react";
import "./Point.scss";
import pointIcon from "../../assets/icons/ic_point.svg";

function Point({ points }) {
  return (
    <div className="point-container">
      <span className="point-icon">
        <img src={pointIcon} alt="Point Icon" />
      </span>
      <span className="point-text">{points}P 획득</span>
    </div>
  );
}

export default Point;

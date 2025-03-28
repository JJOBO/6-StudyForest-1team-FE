import React from "react";
import "./Emoji.scss";

function Emoji({ emoji, count }) {
  return (
    <div className="emoji-container">
      <span className="emoji-icon">{emoji}</span>
      <span className="emoji-count">{count}</span>
    </div>
  );
}

export default Emoji;

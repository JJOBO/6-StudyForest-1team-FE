import React from "react";
import "./GlobalNavigationBar.scss";
import logo from "../assets/logos/img_logo.svg"; // 로고 이미지 경로 수정
import btnCTA from "../assets/buttons/btn_CTA/btn_cta_lg.svg"; // 버튼 이미지 추가

const GlobalNavigationBar = ({ isButtonDisabled }) => {
  return (
    <nav className="global-navigation-bar">
      <a href="/">
        <img src={logo} alt="Logo" className="logo" />
      </a>
      <button
        className={`cta-button ${isButtonDisabled ? "disabled" : ""}`}
        disabled={isButtonDisabled}
      >
        <img src={btnCTA} alt="Call to Action" />
      </button>
    </nav>
  );
};

export default GlobalNavigationBar;

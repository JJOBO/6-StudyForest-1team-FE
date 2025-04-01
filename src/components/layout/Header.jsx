import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logos/img_logo.svg"; // 로고 이미지 경로 수정
import btnCTA from "../../assets/buttons/btn_CTA/btn_cta_lg.svg"; // 버튼 이미지 추가

//<네비명 isButtonDisabled={true} />  true = 비활성화 false = 활성화

const Header = ({ isButtonDisabled }) => {
  return (
    <nav className={styles.globalNavigationBar}>
      <a href="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </a>
      <button
        className={`${styles.ctaButton} ${
          isButtonDisabled ? styles.disabled : ""
        }`}
        disabled={isButtonDisabled}
      >
        <img src={btnCTA} alt="Call to Action" />
      </button>
    </nav>
  );
};

export default Header;

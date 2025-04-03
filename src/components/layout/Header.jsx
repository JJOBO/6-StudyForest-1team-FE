import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logos/img_logo.svg"; // 로고 이미지 경로 수정
import btnCTAPc from "../../assets/buttons/btn_CTA/btn_cta_lg.svg";
import btnCTATablet from "../../assets/buttons/btn_CTA/btn_cta_md.svg";
import btnCTAMobile from "../../assets/buttons/btn_CTA/btn_cta_sm.svg";

import { Link, useNavigate } from "react-router-dom";

//<네비명 isButtonDisabled={true} />  true = 비활성화 false = 활성화

const Header = ({ isButtonDisabled }) => {
  const navigate = useNavigate();
  const [buttonImage, setButtonImage] = useState(btnCTAPc);

  const updateButtonImage = () => {
    const width = window.innerWidth;
    if (width <= 767) {
      setButtonImage(btnCTAMobile);
    } else if (width <= 1023) {
      setButtonImage(btnCTATablet);
    } else {
      setButtonImage(btnCTAPc);
    }
  };

  useEffect(() => {
    updateButtonImage(); 
    window.addEventListener("resize", updateButtonImage); 

    return () => {
      window.removeEventListener("resize", updateButtonImage); 
    };
  }, []);

  const handleCreateStudyClick = () => {
    navigate("/registration");
  };

  return (
    <nav className={styles.globalNavigationBar}>
      <Link to="/">
        <img src={logo} alt="Logo" className={styles.logo} />
      </Link>
      <button
        className={`${styles.ctaButton} ${
          isButtonDisabled ? styles.disabled : ""
        }`}
        disabled={isButtonDisabled}
        onClick={handleCreateStudyClick}
      >
        <img src={buttonImage} alt="Call to Action" />
      </button>
    </nav>
  );
};

export default Header;

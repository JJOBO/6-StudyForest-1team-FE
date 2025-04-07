import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/logos/img_logo.svg";
import btnCTAPc from "../../assets/buttons/btn_CTA/btn_cta_lg.svg";
import btnCTATablet from "../../assets/buttons/btn_CTA/btn_cta_md.svg";
import btnCTAMobile from "../../assets/buttons/btn_CTA/btn_cta_sm.svg";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ isButtonDisabled }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져옵니다.
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

  const handleLogoClick = (event) => {
    if (location.pathname !== "/") {
      event.preventDefault();
      navigate("/");
    } else {
    }
  };

  return (
    <nav className={styles.globalNavigationBar}>
      {location.pathname === "/" ? (
        <a href="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </a>
      ) : (
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      )}
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

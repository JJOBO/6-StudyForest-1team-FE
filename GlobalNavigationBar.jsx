import React from 'react';
import './GlobalNavigationBar.scss'; 
import logo from '../assets/image/img_logo.png'; // 로고 이미지 경로 수정
import btnCTA from '../assets/image/btn_CTA.png'; // 버튼 이미지 추가

const GlobalNavigationBar = () => {
    return (
        <nav className="global-navigation-bar">
            <a href="/"> 
                <img src={logo} alt="Logo" className="logo" />
            </a>
            <a href="/another-page"> {/* 링크는 임의로 설정 */}
                <img src={btnCTA} alt="Call to Action" className="cta-button" /> {/* 버튼 이미지 추가 */}
            </a>
        </nav>
    );
};

export default GlobalNavigationBar;

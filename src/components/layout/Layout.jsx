import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();

  // 홈 페이지에서는 버튼 활성화, 다른 페이지에서는 비활성화
  const isHomePage = location.pathname === "/";
  const isStudyRegistration = location.pathname === "/registration";

  return (
    <>
      <Header isButtonDisabled={!isHomePage && !isStudyRegistration} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();

  // 홈 페이지에서는 버튼 활성화, 다른 페이지에서는 비활성화
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header isButtonDisabled={!isHomePage} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import "../public/css/global.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Container from "./Container";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isRoot = location.pathname === "/login";
  const findPage = location.pathname === "/findPin";

  return (
    <Container>
      <Header />

      <div className="content_wrapper">
        {!isRoot && !findPage && <Sidebar />}
        <div className="main_content">{children}</div>
      </div>
    </Container>
  );
};

export default Layout;

import React, { useState } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import Login from "../components/Login";
import styles from "../public/css/MainPage.module.css";

const MainPage: React.FC = () => {
  const [tab, setTab] = useState("login");

  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className={styles.main_container}>
      <Header />
      <div className={styles.content_container}>
        <div className={styles.tab_container}>
          <div
            onClick={() => handleTabClick("login")}
            className={`${styles.tab_item} ${
              tab === "login" ? styles.active : ""
            }`}
          >
            로그인
          </div>
          <div
            onClick={() => handleTabClick("register")}
            className={`${styles.tab_item} ${
              tab === "register" ? styles.active : ""
            }`}
          >
            회원가입
          </div>
        </div>
        <div className={styles.form_container}>
          {tab === "login" && <Login />}
          {tab === "register" && <Signup />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

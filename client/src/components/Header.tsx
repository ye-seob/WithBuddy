import React from "react";
import styles from "../public/css/Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header_title}>With Buddy</h1>
      <p className={styles.header_subtitle}>
        서경대학교 선후배 학번 매칭 사이트
      </p>
    </div>
  );
};

export default Header;

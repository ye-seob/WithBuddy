import React from "react";
import { CiHome, CiEdit, CiBoxList, CiLogin, CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/user";
import styles from "../public/css/Sidebar.module.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <Link to="/match">
        <div className={styles.icon}>
          <CiHome />
        </div>
      </Link>

      <Link to="/ranking">
        <div className={styles.icon}>
          <CiBoxList />
        </div>
      </Link>

      <Link to="/edit">
        <div className={styles.icon}>
          <CiEdit />
        </div>
      </Link>

      <Link to="/setting">
        <div className={styles.icon}>
          <CiSettings />
        </div>
      </Link>

      <div className={styles.logoutIcon} onClick={handleLogout}>
        <CiLogin />
      </div>
    </div>
  );
};

export default Sidebar;

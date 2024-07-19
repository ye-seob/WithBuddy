import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/InfoPage.module.css";
import Input from "../components/Input";

const InfoPage: React.FC = () => {
  const [instagramId, setInstagramId] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [selectedMbti, setSelectedMbti] = useState("");
  const mbti = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
  ];

  const handleMbtiClick = (type: string) => {
    setSelectedMbti(type);
  };

  return (
    <div className={styles.infopage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.text}>Information Page</span>
          </div>
          <div className={styles.form_container}>
            <Input
              type="text"
              placeholder="인스타 아이디"
              value={instagramId}
              onChange={(e) => setInstagramId(e.target.value)}
            />
            <Input
              type="text"
              placeholder="카카오톡 아이디"
              value={kakaoId}
              onChange={(e) => setKakaoId(e.target.value)}
            />
            <div className={styles.mbti_container}>
              {mbti.map((type) => (
                <button
                  key={type}
                  className={`${styles.mbti_button} ${
                    selectedMbti === type ? styles.selected : ""
                  }`}
                  onClick={() => handleMbtiClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

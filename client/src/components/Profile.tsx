import React, { useState } from "react";
import styles from "../public/css/Profile.module.css";
import { FaInstagram, FaRegComment, FaUser, FaClipboard } from "react-icons/fa";

interface ProfileProps {
  studentId: string;
  name: string;
  snsIds: {
    instaId: string | undefined;
    kakaoId: string | undefined;
  };
  mbti: string;
}

const Profile: React.FC<ProfileProps> = ({ name, studentId, snsIds, mbti }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text);
    setAlertMessage("클립보드에 복사되었습니다.");
    setTimeout(() => {
      setAlertMessage("");
    }, 2000);
  };

  const year = studentId.slice(2, 4);

  return (
    <>
      <div className={styles.profileCard} onClick={handleProfileClick}>
        <h2 className={styles.profileNum}>{year}학번</h2>
        <h3 className={styles.profileName}>{name}</h3>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              X
            </button>
            <div className={styles.modalHeader}>
              {year}학번 {name}
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalItem}>
                <FaInstagram size={20} color="#E1306C" />
                인스타 아이디: {snsIds.instaId || "없음"}
                <div
                  className={styles.copyIcon}
                  onClick={() => handleCopyClick(snsIds.instaId!)}
                >
                  {snsIds.instaId && <FaClipboard size={20} />}
                </div>
              </div>
              <div className={styles.modalItem}>
                <FaRegComment size={20} color="#FFD700" />
                카톡 아이디: {snsIds.kakaoId || "없음"}
                <div
                  className={styles.copyIcon}
                  onClick={() => handleCopyClick(snsIds.kakaoId!)}
                >
                  {snsIds.kakaoId && <FaClipboard size={20} />}
                </div>
              </div>
              <div className={styles.modalItem}>
                <FaUser size={20} color="#6f7d47" />
                MBTI: {mbti}
              </div>
            </div>
          </div>
        </div>
      )}
      {alertMessage && (
        <div className={`${styles.alertMessage} ${styles.show}`}>
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default Profile;

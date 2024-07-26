import React, { useState } from "react";
import Modal from "react-modal";
import styles from "../public/css/Profile.module.css";
import { FaInstagram, FaRegComment, FaUser, FaClipboard } from "react-icons/fa";

interface ProfileProps {
  studentId: string;
  name: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
}

Modal.setAppElement("#root"); // 애플리케이션의 루트 엘리먼트를 설정합니다.

const Profile: React.FC<ProfileProps> = ({
  name,
  studentId,
  instaId,
  kakaoId,
  mbti,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyClick = (text: string | undefined) => {
    navigator.clipboard
      .writeText(text ?? "")
      .then(() => {
        setAlertMessage("클립보드에 복사되었습니다.");
        setTimeout(() => {
          setAlertMessage("");
        }, 2000);
      })
      .catch((err) => {
        console.error("클립보드 복사에 실패했습니다:", err);
      });
  };

  const year = studentId.slice(2, 4);

  return (
    <>
      <div className={styles.profileCard} onClick={handleProfileClick}>
        <h2 className={styles.profileNum}>{year}학번</h2>
        <h3 className={styles.profileName}>{name}</h3>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Profile Modal"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <button className={styles.closeButton} onClick={handleCloseModal}>
          X
        </button>
        <div className={styles.modalHeader}>
          {year}학번 {name}
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalItem}>
            <FaInstagram size={20} color="#E1306C" />
            인스타 아이디: {instaId || "없음"}
            <div
              className={styles.copyIcon}
              onClick={() => handleCopyClick(instaId)}
            >
              {instaId && <FaClipboard size={20} />}
            </div>
          </div>
          <div className={styles.modalItem}>
            <FaRegComment size={20} color="#FFD700" />
            카톡 아이디: {kakaoId || "없음"}
            <div
              className={styles.copyIcon}
              onClick={() => handleCopyClick(kakaoId)}
            >
              {kakaoId && <FaClipboard size={20} />}
            </div>
          </div>
          <div className={styles.modalItem}>
            <FaUser size={20} color="#6f7d47" />
            MBTI: {mbti}
          </div>
        </div>
      </Modal>
      {alertMessage && (
        <div className={`${styles.alertMessage} ${styles.show}`}>
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default Profile;

import { useState } from "react";
import { FaEnvelope, FaGithub, FaTrashAlt } from "react-icons/fa";
import styles from "../public/css/SettingPage.module.css";
import "../public/css/global.css";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useUserStore } from "../stores/userStore";

Modal.setAppElement("#root");

const SettingPage = () => {
  const { studentId } = useUserStore();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete("http://localhost:3000/api/deleteUser", {
        data: { studentId },
      });
      alert("회원이 삭제되었습니다.");

      closeModal();
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("회원 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.header_section}>
        <span className={styles.text}>설정</span>
      </div>
      <div className={styles.info_section}>
        <div className={styles.info_item}>
          <div className={styles.icon}>
            <FaEnvelope />
          </div>
          <span className={styles.infoText}> withBuddy@gmail.com</span>
        </div>
        <div className={styles.info_item}>
          <div className={styles.icon}>
            <FaGithub />
          </div>

          <span className={styles.infoText}>
            <a href="https://github.com/ye-seob/WithBuddy">
              https://github.com/ye-seob/WithBuddy
            </a>
          </span>
        </div>
        <div className={styles.info_item}>
          <div className={styles.icon}>
            <FaTrashAlt />
          </div>
          <Button text="회원 삭제" onClick={openModal}></Button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="회원 삭제 확인"
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
      >
        <p className={styles.infoText}>정말로 회원을 삭제하시겠습니까?</p>

        <div className={styles.buttonContainer}>
          <Button text="취소" onClick={closeModal}></Button>
          <Button text="삭제" onClick={handleDeleteUser}></Button>
        </div>
      </Modal>
    </>
  );
};

export default SettingPage;

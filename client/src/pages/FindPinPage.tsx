import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../public/css/global.css";
import styles from "../public/css/FindPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage";
import { sendFindMail } from "../api/mail";
import { FaArrowLeft } from "react-icons/fa";

const FindPinPage = () => {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSendMail = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    try {
      const result = await sendFindMail(email, studentId);
      if (result === 200) {
        setAlertMessage("전송되었습니다.");

        setTimeout(() => {
          navigate("/");
        }, 7000);
      } else {
        setAlertErrorMessage("메일 전송에 실패하였습니다.");
      }
    } catch (error) {
      setAlertErrorMessage("메일 전송에 실패하였습니다.");
    } finally {
      setTimeout(() => {
        setIsDisabled(false);
      }, 6000);
    }
  };

  return (
    <>
      <div className={styles.header_section}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <div className="backButton">
            <FaArrowLeft size={20} color="white" />
          </div>
        </button>
        <span className={styles.text}>pin 번호 찾기</span>
      </div>
      <div className={styles.form}>
        <Input
          type="text"
          placeholder="학번 Ex) 2023216049"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <Input
          type="text"
          placeholder="이메일 Ex) WithBuddy@skuniv.ac.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.button_Warpper}>
          <Button text="전송" onClick={handleSendMail} />
        </div>
      </div>
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type="success"
          onClose={() => setAlertMessage("")}
        />
      )}
      {alertErrorMessage && (
        <AlertMessage
          message={alertErrorMessage}
          type="error"
          onClose={() => setAlertErrorMessage("")}
        />
      )}
    </>
  );
};

export default FindPinPage;

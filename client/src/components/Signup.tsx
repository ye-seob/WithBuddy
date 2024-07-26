import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";
import Input from "./Input";
import Button from "./Button";
import { checkAuthCode, sendMail } from "../api/mail";
import { signup } from "../api/user";
import styles from "../public/css/Signup.module.css";
import { mbtiList } from "../util/mbti";
import { majors } from "../util/major.ts";
import AlertMessage from "../components/AlertMessage";
import { useNavigate } from "react-router-dom";
Modal.setAppElement("#root");

interface Errors {
  studentId?: string;
  pin?: string;
  pinConfirm?: string;
  email?: string;
  authCode?: string;
  sns?: string;
}

Modal.setAppElement("#root");

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("소프트웨어학과");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [instaId, setInstaId] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [mbti, setMbti] = useState("");
  const [checkedAuthCode, setCheckedAuthCode] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [pinType, setPinType] = useState("password");
  const [pinConfirmType, setPinConfirmType] = useState("password");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!/^[0-9]{10}$/.test(studentId))
      newErrors.studentId = "학번을 올바르게 입력해주세요.";
    if (!/^[0-9]{4}$/.test(pin))
      newErrors.pin = "PIN 번호는 4자리 숫자여야 합니다.";
    if (pin !== pinConfirm)
      newErrors.pinConfirm = "PIN 번호가 일치하지 않습니다.";
    if (!/^[\w-.]+@skuniv\.ac\.kr$/.test(email))
      newErrors.email = "유효한 서경 이메일을 입력해주세요.";
    if (!authCode) newErrors.authCode = "인증번호를 입력해주세요.";
    if (!checkedAuthCode) newErrors.authCode = "인증번호 불일치";
    if (!instaId && !kakaoId)
      newErrors.sns =
        "인스타그램 또는 카카오톡 아이디를 하나 이상 입력해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuthCodeSubmit = async () => {
    try {
      const response = await checkAuthCode(email, authCode);
      if (response === "200") {
        setCheckedAuthCode(true);
        setAuthMessage("인증 성공");
      } else {
        setAuthMessage("인증 실패");
      }
    } catch (error) {
      console.error(error);
      setAuthMessage("인증 중 오류 발생");
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsModalOpen(true);
    }
  };

  const handleConfirmSubmit = async () => {
    try {
      const response = await signup({
        name,
        studentId,
        major,
        pin,
        pinConfirm,
        email,
        instaId,
        kakaoId,
        mbti,
      });

      alert(response);
      setIsModalOpen(false);
      navigate(0);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleMbtiClick = (type: string) => {
    setMbti(type);
  };

  const handleMajorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMajor(e.target.value);
  };

  const handleSendMail = async () => {
    if (isDisabled) return;
    setIsDisabled(true);
    try {
      const result = await sendMail(email);
      if (result === 200) {
        setAlertMessage("전송되었습니다.");
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
      <label className={styles.label}>인적사항</label>
      <Input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="학번 Ex) 2023216049"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      {errors.studentId && (
        <div className={styles.error_message}>{errors.studentId}</div>
      )}
      <div className={styles.select_container}>
        <select
          value={major}
          onChange={handleMajorChange}
          className={styles.select}
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.input_with_button}>
        <Input
          type={pinType}
          placeholder="Pin 번호 Ex) 1234"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button
          onMouseDown={() => setPinType("text")}
          onMouseUp={() => setPinType("password")}
          onMouseLeave={() => setPinType("password")}
          className={styles.button}
        >
          보기
        </button>
      </div>
      {errors.pin && <div className={styles.error_message}>{errors.pin}</div>}
      <div className={styles.input_with_button}>
        <Input
          type={pinConfirmType}
          placeholder="Pin 번호 확인"
          value={pinConfirm}
          onChange={(e) => setPinConfirm(e.target.value)}
        />
        <button
          onMouseDown={() => setPinConfirmType("text")}
          onMouseUp={() => setPinConfirmType("password")}
          onMouseLeave={() => setPinConfirmType("password")}
          className={styles.button}
        >
          보기
        </button>
      </div>
      {errors.pinConfirm && (
        <div className={styles.error_message}>{errors.pinConfirm}</div>
      )}
      <label className={styles.label}>서경 이메일 인증</label>
      <div className={styles.input_with_button}>
        <Input
          type="text"
          placeholder="Ex) WithBuddy@skuniv.ac.kr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text="전송" onClick={handleSendMail} />
      </div>
      {errors.email && (
        <div className={styles.error_message}>{errors.email}</div>
      )}
      <div className={styles.input_with_button}>
        <Input
          type="text"
          placeholder="인증번호"
          value={authCode}
          onChange={(e) => setAuthCode(e.target.value)}
        />
        <Button text="확인" onClick={handleAuthCodeSubmit} />
      </div>
      {authMessage && (
        <div
          className={
            checkedAuthCode ? styles.success_message : styles.error_message
          }
        >
          {authMessage}
        </div>
      )}
      {errors.authCode && (
        <div className={styles.error_message}>{errors.authCode}</div>
      )}
      <label className={styles.label}>SNS 아이디</label>
      <Input
        type="text"
        placeholder="인스타 아이디"
        value={instaId}
        onChange={(e) => setInstaId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="카카오톡 아이디"
        value={kakaoId}
        onChange={(e) => setKakaoId(e.target.value)}
      />
      {errors.sns && <div className={styles.error_message}>{errors.sns}</div>}
      <label className={styles.label}>MBTI</label>
      <div className={styles.mbti_container}>
        {mbtiList.map((type) => (
          <button
            key={type}
            className={`${styles.mbti_button} ${
              mbti === type ? styles.selected : ""
            }`}
            onClick={() => handleMbtiClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <Button text="가입" onClick={handleSubmit} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="회원가입 정보 확인"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.modalContent}>
          <h2>입력한 정보가 맞습니까?</h2>
          <p>이름: {name}</p>
          <p>학번: {studentId}</p>
          <p>전공: {major}</p>
          <p>Email: {email}</p>
          <p>인스타 아이디: {instaId}</p>
          <p>카카오톡 아이디: {kakaoId}</p>
          <p>MBTI: {mbti}</p>
          <div className={styles.modalButtons}>
            <Button text="취소" onClick={() => setIsModalOpen(false)} />
            <Button text="확인" onClick={handleConfirmSubmit} />
          </div>
        </div>
      </Modal>
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

export default Signup;

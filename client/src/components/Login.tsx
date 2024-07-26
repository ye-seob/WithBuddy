import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/Login.module.css";
import { login } from "../api/user";
import AlertMessage from "../components/AlertMessage";

const Login: React.FC = () => {
  const [pin, setPin] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");
  const {
    studentId,
    setName,
    setStudentId,
    setMajor,
    setInstaId,
    setKakaoId,
    setMbti,
  } = useUserStore();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const response = await login({ studentId, pin });
      const { userName, major, instaId, kakaoId, mbti } = response;

      setName(userName);
      setMajor(major);
      setInstaId(instaId);
      setKakaoId(kakaoId);
      setMbti(mbti);
      navigate("/match");
    } catch (error) {
      setAlertErrorMessage(
        "등록되지 않은 학번 또는 PIN 번호가 일치하지 않습니다"
      );
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="학번 Ex) 2023216049"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Pin 번호 Ex) 1234"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <Button text="로그인" onClick={handleLogin} />
      <p className={styles.login_container}>Pin번호가 기억나지 않으신가요?</p>
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

export default Login;

import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/Login.module.css";
import { login } from "../api/user";
import AlertMessage from "../components/AlertMessage";

const Login = () => {
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Input
        type="text"
        placeholder="학번 Ex) 2023216049"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Input
        type="password"
        placeholder="Pin 번호 Ex) 1234"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button text="로그인" onClick={handleLogin} />
      <Link to="/findPin">
        <p className={styles.login_container}>Pin번호가 기억나지 않으신가요?</p>
      </Link>
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

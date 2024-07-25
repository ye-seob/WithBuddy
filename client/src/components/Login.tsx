import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/Login.module.css";
import { login } from "../api/user";

const Login: React.FC = () => {
  const [pin, setPin] = useState("");
  const { studentId, setName, setStudentId, setMajor, setSnsIds, setMbti } =
    useUserStore();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const response = await login({ studentId, pin });
      const { userName, major, snsIds, mbti } = response;

      setName(userName);
      setMajor(major);
      setSnsIds(snsIds);
      setMbti(mbti);
      navigate("/match");
    } catch (error) {
      console.error("Login failed:", error);
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
      {/* 나중에 클래스네임 변경 해야함 */}
    </>
  );
};

export default Login;

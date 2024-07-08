import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useSignupStore } from "../stores/signupStore";
import axios from "axios";
const sendMail = async (email: string) => {
  try {
    const response = await axios.post("http://localhost:3000/api/send-mail", {
      email,
    });
    alert(response.data);
  } catch (error) {
    console.error("메일 전송 실패:", error);
    alert("메일 전송에 실패했습니다. 다시 시도해 주세요.");
  }
};
const Signup: React.FC = () => {
  

  const {
    name,
    studentId,
    pin,
    pinConfirm,
    email,
    authCode,
    step,
    setName,
    setStudentId,
    setPin,
    setPinConfirm,
    setEmail,
    setAuthCode,
    setStep,
  } = useSignupStore();

  const handleNextStep = () => {
    if (step === 1 && studentId && /^[0-9]{10}$/.test(studentId)) {
      setStep(2);
    } else {
      alert("학번을 올바르게 입력해주세요.");
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!/^[0-9]{4}$/.test(pin)) {
      alert("PIN 번호는 4자리 숫자여야 합니다.");
      return;
    }
    if (pin !== pinConfirm) {
      alert("PIN 번호가 일치하지 않습니다.");
      return;
    }
    if (!/^[\w-.]+@skuniv\.ac\.kr$/.test(email)) {
      alert("유효한 서경 이메일을 입력해주세요.");
      return;
    }
    if (!authCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    handleSignup();
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        name,
        studentId,
        pin,
        pinConfirm,
        email,
        authCode,
      });
      alert(`${response.data} `);
    } catch (error) {
      console.error("signup failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {step === 1 && (
        <>
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
          <div className="flex flex-col items-center w-56">
            <Button text="다음" onClick={handleNextStep} />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <Input
            type="password"
            placeholder="Pin 번호 Ex) 1234"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Pin 번호 확인"
            value={pinConfirm}
            onChange={(e) => setPinConfirm(e.target.value)}
          />
          <Input
            type="text"
            placeholder="서경 이메일 Ex) ByBuddy@skuniv.ac.kr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text="전송" onClick={() => sendMail(email)} />
          <Input
            type="text"
            placeholder="인증번호"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <div className="flex justify-between w-56  -mt-6">
            <Button text="이전" onClick={handlePreviousStep} />
            <Button text="가입" onClick={handleSubmit} />
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;

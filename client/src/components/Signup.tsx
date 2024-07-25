import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { checkAuthCode, sendMail } from "../api/mail";
import { signup } from "../api/user";
import styles from "../public/css/Signup.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState<string>("소프트웨어학과");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const mbtiList = [
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
  const [instaId, setInstaId] = useState("");
  const [kakaoId, setKakaoId] = useState("");
  const [mbti, setMbti] = useState("");

  const [errors, setErrors] = useState<{
    studentId: string;
    pin: string;
    pinConfirm: string;
    email: string;
    authCode: string;
  }>({
    studentId: "",
    pin: "",
    pinConfirm: "",
    email: "",
    authCode: "",
  });

  const validateStudentId = (id: string): boolean => /^[0-9]{10}$/.test(id);

  const validatePin = (pin: string): boolean => /^[0-9]{4}$/.test(pin);

  const validateEmail = (email: string): boolean =>
    /^[\w-.]+@skuniv\.ac\.kr$/.test(email);

  let checkedAuthCode = false;
  const handleAuthCodeSubmit = async () => {
    try {
      const response = await checkAuthCode(email, authCode);
      //조건식 수정해야함
      console.log(response);
      if (response === "200") {
        checkedAuthCode = true;
        alert("인증 성공");
        console.log(checkedAuthCode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    let valid = true;
    if (!validateStudentId(studentId)) {
      setErrors((prev) => ({
        ...prev,
        studentId: "학번을 올바르게 입력해주세요.",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, studentId: "" }));
    }

    if (!validatePin(pin)) {
      setErrors((prev) => ({
        ...prev,
        pin: "PIN 번호는 4자리 숫자여야 합니다.",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, pin: "" }));
    }

    if (pin !== pinConfirm) {
      setErrors((prev) => ({
        ...prev,
        pinConfirm: "PIN 번호가 일치하지 않습니다.",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, pinConfirm: "" }));
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "유효한 서경 이메일을 입력해주세요.",
      }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!authCode) {
      setErrors((prev) => ({ ...prev, authCode: "인증번호를 입력해주세요." }));
      valid = false;
    } else {
      setErrors((prev) => ({ ...prev, authCode: "" }));
    }

    if (!checkedAuthCode) {
      //수정해야함
      alert("인증번호 불일치");
      return;
    }
    if (valid) {
      try {
        console.log(major);
        const response = await signup({
          name,
          studentId,
          major,
          pin,
          pinConfirm,
          email,
          snsIds: { instaId, kakaoId },
          mbti,
        });

        alert(response);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    }
  };
  const handleMbtiClick = (type: string) => {
    setMbti(type);
  };

  const handleMajor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMajor(event.target.value);
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
      <select value={major} onChange={handleMajor}>
        <option value="소프트웨어학과">소프트웨어학과</option>
        <option value="전자컴퓨터공학과">전자컴퓨터공학과</option>
        <option value="경제학과">경제학과</option>
        <option value="글로벌비지니스학과">글로벌비지니스학과</option>
      </select>
      <Input
        type="password"
        placeholder="Pin 번호 Ex) 1234"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      {errors.pin && <div className={styles.error_message}>{errors.pin}</div>}
      <Input
        type="password"
        placeholder="Pin 번호 확인"
        value={pinConfirm}
        onChange={(e) => setPinConfirm(e.target.value)}
      />
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
        <Button text="전송" onClick={() => sendMail(email)} />
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
      {errors.authCode && (
        <div className={styles.error_message}>{errors.authCode}</div>
      )}
      <label className={styles.label}>sns 아이디</label>
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
    </>
  );
};

export default Signup;

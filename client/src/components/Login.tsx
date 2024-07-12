import Button from "./Button";
import Input from "./Input";
import { useLoginStore } from "../stores/loginStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../stores/mainStore";
import styles from "../public/css/Login.module.css";

const Login: React.FC = () => {
  const { studentId, pin, setStudentId, setPin, setName } = useLoginStore();
  const { setCommonNumber, setBuddyName } = useMainStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        {
          studentId,
          pin,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { name } = response.data;
        setName(name);
        setCommonNumber("");
        setBuddyName("");
        navigate("/match");
      }
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

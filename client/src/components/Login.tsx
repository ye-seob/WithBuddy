import Button from "./Button";
import Input from "./Input";
import { useLoginStore } from "../stores/loginStore";

const Login = () => {
  const { id, pin, setId, setPin } = useLoginStore();
  const handleLogin = () => {
    alert(`ID: ${id} 및 PIN: ${pin}로 로그인 중`);
  };
  return (
    <>
      <Input
        type="text"
        placeholder="학번 Ex) 2023216049"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Pin 번호 Ex) 1234"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />
      <Button text="로그인" onClick={handleLogin} />

      <p className="text-center text-[#C8B7B7] mt-10">
        Pin번호가 기억나지 않으신가요?
      </p>
    </>
  );
};

export default Login;

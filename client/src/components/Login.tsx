import React, { useState } from "react";
import { useLoginStore } from "./store";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

const Login: React.FC = () => {
  const { id, pin, setId, setPin } = useLoginStore();
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = () => {
    alert(`ID: ${id} 및 PIN: ${pin}로 로그인 중`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEBDF]">
      <Header />
      <div className="bg-[#F7F6F0] flex flex-col items-center p-0 rounded-2xl shadow-md w-[400px]">
        <div className="w-full flex bg-[#C6D1AE] rounded-t-2xl overflow-hidden">
          <div
            onClick={() => handleTabClick("login")}
            className={`flex-1 text-center cursor-pointer py-4 ${
              activeTab === "login"
                ? "border-b-4 bg-[#C6D1AE]"
                : "border-b border-transparent"
            }`}
          >
            로그인
          </div>
          <div
            onClick={() => handleTabClick("register")}
            className={`flex-1 text-center cursor-pointer py-4 ${
              activeTab === "register"
                ? "border-b-4 bg-[#C6D1AE]"
                : "border-b border-transparent"
            }`}
          >
            회원가입
          </div>
        </div>
        {activeTab === "login" && (
          <div className="flex flex-col items-center justify-center mt-6 p-10">
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
          </div>
        )}
        {activeTab === "register" && (
          <div className="flex flex-col items-center justify-center mt-6 p-10">
            {/* Registration form goes here */}
            <p className="text-center text-gray-500">
              회원가입 양식을 작성해주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

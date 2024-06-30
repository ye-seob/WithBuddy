import React, { useState } from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";
import Login from "../components/Login";

const MainPage: React.FC = () => {
  const [tab, setTab] = useState("login");

  const handleTabClick = (tab: string) => {
    setTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEBDF]">
      <Header />
      <div className="bg-[#F7F6F0] flex flex-col items-center p-0 rounded-2xl shadow-md w-[400px]">
        <div className="w-full flex bg-[#C6D1AE] rounded-t-2xl overflow-hidden">
          <div
            onClick={() => handleTabClick("login")}
            className={`flex-1 text-center cursor-pointer py-4 ${
              tab === "login"
                ? "border-b-4 bg-[#C6D1AE]"
                : "border-b border-transparent"
            }`}
          >
            로그인
          </div>
          <div
            onClick={() => handleTabClick("register")}
            className={`flex-1 text-center cursor-pointer py-4 ${
              tab === "register"
                ? "border-b-4 bg-[#C6D1AE]"
                : "border-b border-transparent"
            }`}
          >
            회원가입
          </div>
        </div>
        <div className="flex w-[400px] h-[400px] flex-col items-center  p-10 max-h-[400px]">
          {tab === "login" && <Login />}
          {tab === "register" && <Signup />}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import React from "react";
import { CiHome, CiEdit, CiBoxList, CiLogin, CiSettings } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/logout");

      if (response.status === 200) {
        console.log("로그아웃 성공");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="w-16 mr-16 flex flex-col items-center rounded-xl bg-[#F7F6F0] shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to="/match">
        <div className="mt-10 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out">
          <CiHome />
        </div>
      </Link>

      <Link to="/ranking">
        <div className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out">
          <CiBoxList />
        </div>
      </Link>

      <Link to="/edit">
        <div className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out">
          <CiEdit />
        </div>
      </Link>

      <Link to="/setting">
        <div className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out">
          <CiSettings />
        </div>
      </Link>

      <div
        className="mt-14 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out cursor-pointer"
        onClick={handleLogout}
      >
        <CiLogin />
      </div>
    </div>
  );
};

export default Sidebar;

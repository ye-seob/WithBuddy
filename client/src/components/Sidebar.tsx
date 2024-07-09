import {
  CiHome,
  CiEdit,
  CiSearch,
  CiBoxList,
  CiLogin,
  CiSettings,
} from "react-icons/ci";
import { Link } from "react-router-dom";
const Sidebar: React.FC = () => {
  return (
    <div className="w-16 mr-16 flex flex-col items-center rounded-xl bg-[#F7F6F0] shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link to="/match">
        <CiHome className=" text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>

      <Link to="/info">
        <CiSearch className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>

      <Link to="/ranking">
        <CiBoxList className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>
      <Link to="/edit">
        <CiEdit className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>
      <Link to="/">
        <CiSettings className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>
      <Link to="/">
        <CiLogin className="mt-12 text-3xl hover:scale-125 hover:font-bold transition-transform duration-200 ease-in-out" />
      </Link>
    </div>
  );
};

export default Sidebar;

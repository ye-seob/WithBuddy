import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

const MatchPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEBDF]">
      <Header />
      <div className="flex  justify-center w-[1000px]">
        <Sidebar />
        <div className="bg-[#F7F6F0] flex flex-col items-center rounded-2xl shadow-md w-[400px] mr-28">
          <div className="w-full h-14 bg-[#C6D1AE] rounded-t-2xl flex items-center justify-center">
            <span className="text-white font-bold">216049</span>
          </div>
          <div className="flex w-[400px] h-[400px] p-10 justify-between ">
            <div className="flex flex-col items-center">
              <span className="text-[#C6D1AE] font-bold mb-4">2023</span>
              <Profile />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#C6D1AE] font-bold mb-4">2024</span>
              <Profile />
            </div>
          </div>
          <div className="  text-center flex text-[#C6D1AE] font-bold -mt-10 mb-10">
            since 2023-07-03
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

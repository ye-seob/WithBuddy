import { useEffect } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useMainStore } from "../stores/mainStore";
import { useLoginStore } from "../stores/loginStore";

const MatchPage: React.FC = () => {
  const { commonNumber, setCommonNumber, buddyName, setBuddyName } =
    useMainStore();

  const { name, studentId } = useLoginStore();

  useEffect(() => {
    const loadBuddy = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/match", {
          params: { studentId },
        });
        console.log(response.data);
        setCommonNumber(response.data[0].commonNumber);
        if (response.data.length > 1) {
          if (studentId === "2023" + commonNumber)
            setBuddyName(response.data[1].name);
          else {
            setBuddyName(response.data[0].name);
          }
        } else {
          setBuddyName("등록되지 않았습니다");
        }
      } catch (error) {
        console.error("Buddy 불러오기 실패:", error);
      }
    };

    loadBuddy();
  }, [studentId, setCommonNumber]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEBDF]">
      <Header />
      <div className="flex justify-center w-[1000px]">
        <Sidebar />
        <div className="bg-[#F7F6F0] flex flex-col items-center rounded-2xl shadow-md w-[400px] mr-28">
          <div className="w-full h-14 bg-[#C6D1AE] rounded-t-2xl flex items-center justify-center">
            <span className="text-white font-bold">{commonNumber}</span>
          </div>
          <div className="flex w-[400px] h-[400px] p-10 justify-between">
            <div className="flex flex-col items-center">
              <span className="text-[#C6D1AE] font-bold mb-4">2023</span>
              <Profile />
              <span className="text-[#C6D1AE] font-bold mt-4">
                {studentId === "2023" + commonNumber ? name : buddyName}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#C6D1AE] font-bold mb-4">2024</span>
              <Profile />
              <span className="text-[#C6D1AE] font-bold mt-4">
                {studentId === "2023" + commonNumber ? buddyName : name}
              </span>
            </div>
          </div>
          <div className="text-center flex text-[#C6D1AE] font-bold -mt-10 mb-10">
            since 2023-07-03
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

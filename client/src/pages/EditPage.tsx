import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const EditPage: React.FC = () => {
  const test = "변예섭";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ECEBDF]">
      <Header />
      <div className="flex justify-center w-[1000px]">
        <Sidebar />
        <div className="bg-[#F7F6F0] flex flex-col items-center rounded-2xl shadow-md w-[400px] mr-28 min-h-[500px]">
          <div className="w-full h-14 bg-[#C6D1AE] rounded-t-2xl flex items-center justify-center">
            <span className="text-[#6B705C] font-bold">회원 정보 수정</span>
          </div>
          <form className="flex flex-col w-full p-10 space-y-4">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-[#6B705C] font-semibold">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder={test}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="pin" className="text-[#6B705C] font-semibold">
                PIN 번호
              </label>
              <input
                type="text"
                id="pin"
                name="pin"
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-[#6B705C] font-semibold">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 border rounded-md w-full bg-gray-200 cursor-not-allowed"
                readOnly
                placeholder={test}
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="studentId"
                className="text-[#6B705C] font-semibold"
              >
                학번
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                className="mt-1 p-2 border rounded-md w-full bg-gray-200 cursor-not-allowed"
                readOnly
                placeholder={test}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#C6D1AE] text-white font-bold py-2 rounded-md"
            >
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

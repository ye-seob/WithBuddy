import { useState } from "react";

interface ProfileProps {
  num: string;
  name: string;
}
const Profile: React.FC<ProfileProps> = ({ name, num }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex flex-col justify-center items-center w-[150px] h-[200px] bg-[#FFFFFF] rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={handleProfileClick}
      >
        <h2 className="font-bold text-[#98a679]">{num}</h2>
        <h3 className="text-lg font-bold text-[#98a679]">{name}</h3>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              className="absolute top-4 right-4"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{name}</h2>

            <p>이름: {name}</p>
            <p>인스타 아이디: test</p>
            <p>선후배에게 남긴말 :</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

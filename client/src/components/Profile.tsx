import { useState } from "react";
import styles from "../public/css/Profile.module.css";

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
      <div className={styles.profileCard} onClick={handleProfileClick}>
        <h2 className={styles.profileNum}>{num}</h2>
        <h3 className={styles.profileName}>{name}</h3>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <p>이름: {name}</p>
            <p>인스타 아이디: test</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

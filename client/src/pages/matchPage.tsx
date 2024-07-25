import { useEffect, useState } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

import { useUserStore } from "../stores/userStore";

import styles from "../public/css/MatchPage.module.css";

import { loadBuddy } from "../api/match";

interface BuddyData {
  name: string;
  major: string;
  studentId: string;
  snsIds: string[];
  mbti: string;
}
const MatchPage: React.FC = () => {
  const { major, studentId } = useUserStore();
  const [buddyData, setBuddyData] = useState<BuddyData[] | null>(null);

  // 학과 이름
  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadBuddy(major, studentId);
        setBuddyData(data);
      } catch (error) {
        //
      }
    };

    fetchBuddyData();
  }, [studentId, major]);

  return (
    <div className={styles.matchpage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          {/* 초록 ,학번 부분  */}
          <div className={styles.header_section}>
            <span className={styles.commonNumber}>소웨 49번</span>
          </div>

          {/* 프로필 섹션 */}
          <div className={styles.profiles_section}>
            {buddyData ? (
              buddyData.map((buddy, index) => (
                <div key={index} className={styles.profile}>
                  <Profile num={buddy.studentId} name={buddy.name} />
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

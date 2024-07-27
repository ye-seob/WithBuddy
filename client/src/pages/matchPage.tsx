import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import { useUserStore } from "../stores/userStore";
import styles from "../public/css/MatchPage.module.css";
import "../public/css/global.css";
import { loadBuddy } from "../api/match";

interface BuddyData {
  name: string;
  major: string;
  studentId: string;
  instaId: string | undefined;
  kakaoId: string | undefined;
  mbti: string;
}

const MatchPage: React.FC = () => {
  const { major, studentId } = useUserStore();
  const [buddyData, setBuddyData] = useState<BuddyData[] | null>(null);

  const lastTwo = studentId.slice(-2);

  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadBuddy(major, studentId);
        setBuddyData(data);
      } catch (error) {
        // 오류 처리 로직
      }
    };

    fetchBuddyData();
  }, [studentId, major]);

  return (
    <>
      <div className={styles.header_section}>
        <span className={styles.commonNumber}>
          {major} {lastTwo}번
        </span>
      </div>

      {/* 프로필 섹션 */}
      <div className={styles.profiles_section}>
        {buddyData ? (
          buddyData.map((buddy, index) => (
            <div key={index} className={styles.profile}>
              <Profile
                studentId={buddy.studentId}
                name={buddy.name}
                instaId={buddy.instaId}
                kakaoId={buddy.kakaoId}
                mbti={buddy.mbti}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default MatchPage;

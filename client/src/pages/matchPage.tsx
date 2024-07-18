import { useEffect, useState } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

import { useUserStore } from "../stores/userStore";

import styles from "../public/css/MatchPage.module.css";

import { loadBuddy } from "../api/match";
import { refreshToken } from "../api/token";
const MatchPage: React.FC = () => {
  const {
    name,
    studentId,
    commonNumber,
    buddyName,
    major,
    setBuddyName,
    setMajor,
  } = useUserStore();

  // 매칭 유무
  const [matchedAt, setMatchedAt] = useState("");
  // 학과 이름
  useEffect(() => {
    const fetchBuddyData = async () => {
      try {
        const data = await loadBuddy(studentId);
        const buddyData = data.buddy;
        const majorName = data.majorName;
        setMajor(majorName);

        if (buddyData.length > 1) {
          setMatchedAt(buddyData[0].matchedAt);
          setBuddyName(
            studentId === "2023" + buddyData[0].commonNumber
              ? buddyData[1].name
              : buddyData[0].name
          );
        } else {
          setBuddyName("등록되지 않았습니다");
        }
      } catch (error) {
        setMatchedAt("오류 발생");
        setBuddyName("오류 발생");
      }
    };

    fetchBuddyData();
  }, [studentId, setBuddyName, setMajor]);

  return (
    <div className={styles.matchpage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          {/* 초록 ,학번 부분  */}
          <div className={styles.header_section}>
            <span className={styles.commonNumber}>{commonNumber}</span>
          </div>
          {/* 학과명 부분 */}
          <div className={styles.major}>
            <span className={styles.label}>{major}</span>
          </div>

          {/* 프로필 섹션 */}
          <div className={styles.profiles_section}>
            <div className={styles.profile}>
              <Profile
                num="2023" // 2023+공통학번이 나의 학번이면 내 이름 아니면 버디 이름
                name={studentId === "2023" + commonNumber ? name : buddyName}
              />
            </div>
            <div className={styles.profile}>
              <Profile
                num="2024"
                name={studentId === "2023" + commonNumber ? buddyName : name}
              />
            </div>
          </div>
          <button onClick={refreshToken}>버튼</button>
          <div className={styles.matched_label}>since {matchedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

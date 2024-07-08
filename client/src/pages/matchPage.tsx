import { useEffect, useState } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useMainStore } from "../stores/mainStore";
import { useLoginStore } from "../stores/loginStore";
import styles from "../public/css/MatchPage.module.css";

const MatchPage: React.FC = () => {
  const { commonNumber, setCommonNumber, buddyName, setBuddyName } =
    useMainStore();
  const { name, studentId } = useLoginStore();
  const [matchedAt, setMatchedAt] = useState("");

  useEffect(() => {
    const loadBuddy = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/match", {
          params: { studentId },
        });
        const data = response.data;
        console.log(data);

        if (data.length > 0) {
          setCommonNumber(data[0].commonNumber);
          setMatchedAt(
            "since " + new Date(data[0].matchedAt).toLocaleDateString()
          );

          if (data.length > 1) {
            setBuddyName(
              studentId === "2023" + data[0].commonNumber
                ? data[1].name
                : data[0].name
            );
          } else {
            setMatchedAt(" 등록되지 않았습니다");
            setBuddyName("등록되지 않았습니다");
          }
        } else {
          setMatchedAt(" 등록되지 않았습니다");
          setBuddyName("등록되지 않았습니다");
        }
      } catch (error) {
        console.error("Buddy 불러오기 실패:", error);
        setMatchedAt("오류 발생");
        setBuddyName("오류 발생");
      }
    };

    loadBuddy();
  }, [studentId, setCommonNumber, setBuddyName]);

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
          <span className={styles.label}>💻 소프트웨어학과</span>
          {/* 프로필 섹션 */}
          <div className={styles.profiles_section}>
            <div className={styles.profile}>
              <Profile
                num="2023"
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
          <div className={styles.matched_label}>{matchedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

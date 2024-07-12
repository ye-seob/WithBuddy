import { useEffect, useState } from "react";

import Header from "../components/Header";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

import axios from "axios";

import { useMainStore } from "../stores/mainStore";
import { useLoginStore } from "../stores/loginStore";

import styles from "../public/css/MatchPage.module.css";

const MatchPage: React.FC = () => {
  //공통번호,버디 이름
  const { commonNumber, setCommonNumber, buddyName, setBuddyName } =
    useMainStore();
  //이름 학번
  const { name, studentId } = useLoginStore();
  //매칭 유무
  const [matchedAt, setMatchedAt] = useState("");
  //학과 이름
  const [major, setMajor] = useState("");

  useEffect(() => {
    const loadBuddy = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/match", {
          params: { studentId },
        });
        const data = response.data.buddy;
        const majorName = response.data.majorName;

        if (data.length > 0) {
          setCommonNumber(data[0].commonNumber);
          setMatchedAt(
            "since " + new Date(data[0].matchedAt).toLocaleDateString()
          );
          setMajor(majorName);
          if (data.length > 1) {
            setBuddyName(
              studentId === "2023" + data[0].commonNumber
                ? data[1].name
                : data[0].name
            );
          } else {
            setMatchedAt(" 등록되지 않았습니다");
            setBuddyName("");
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
          <div className={styles.matched_label}>{matchedAt}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;

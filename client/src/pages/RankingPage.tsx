import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/RankingPage.module.css";
import axios from "axios";

interface Major {
  name: string;
  code: number;
  number: number;
  matches: string;
}

const RankingPage = () => {
  const [rankingData, setRankingData] = useState<Major[]>([]);

  const loadRanking = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/ranking");
      setRankingData(response.data); // 가져온 데이터를 상태로 설정합니다.
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div className={styles.rankingpage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.text}>학과별 가입자 수</span>
          </div>
          <div>
            {rankingData.length > 0 ? (
              rankingData.map((major) => (
                <div key={major.name}>
                  <span>{major.name}</span>
                  <span>{major.number} </span>
                  <span>{major.matches} </span>
                </div>
              ))
            ) : (
              <span>데이터가 없습니다</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;

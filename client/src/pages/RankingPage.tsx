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
      setRankingData(response.data);
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
          <div className={styles.ranking_list}>
            {rankingData.length > 0 ? (
              rankingData
                .sort((a, b) => b.number - a.number)
                .map((major, index) => (
                  <div key={major.name} className={styles.major_item}>
                    <span className={styles.rank}>{index + 1}</span>
                    <span className={styles.major_name}>{major.name}</span>
                    <div className={styles.bar_container}>
                      <div
                        className={styles.bar}
                        style={{ width: `${(major.number / 200) * 100}%` }}
                      ></div>
                      <span className={styles.number}>{major.number}</span>
                    </div>
                    <span className={styles.matches}>{major.matches}</span>
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

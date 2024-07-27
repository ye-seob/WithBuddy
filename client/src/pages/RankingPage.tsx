import { useState, useEffect } from "react";
import styles from "../public/css/RankingPage.module.css";
import "../public/css/global.css";
import { laodRanking } from "../api/ranking";

interface Major {
  name: string;
  code: number;
  number: number;
}

const RankingPage = () => {
  const [rankingData, setRankingData] = useState<Major[]>([]);

  const loadRanking = async () => {
    try {
      const data = await laodRanking();
      setRankingData(data);
    } catch (error) {
      console.error("불러오기 실패:", error);
    }
  };

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <>
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
                    style={{ width: `${(major.number / 10) * 100}%` }}
                  ></div>
                  <span className={styles.number}>{major.number}</span>
                </div>
              </div>
            ))
        ) : (
          <span className={styles.label}>로그인 후 다시 이용해주세요</span>
        )}
      </div>
    </>
  );
};

export default RankingPage;

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/InfoPage.module.css";
import { useLoginStore } from "../stores/loginStore";
const InfoPage = () => {
  const { name } = useLoginStore();
  return (
    <div className={styles.infopage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.text}>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

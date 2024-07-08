import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/EditPage.module.css";

const EditPage: React.FC = () => {
  const test = "변예섭";
  return (
    <div className={styles.editpage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.title}>회원 정보 수정</span>
          </div>
          <form className={styles.form}>
            <div className={styles.form_group}>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder={test}
              />
            </div>

            <div className={styles.form_group}>
              <input
                type="text"
                id="pin"
                name="pin"
                className={styles.input}
                placeholder="PIN 번호"
              />
            </div>
            <div className={styles.form_group}>
              <input
                type="text"
                id="pin"
                name="pin"
                className={styles.input}
                placeholder="PIN 번호 확인"
              />
            </div>

            <button type="submit" className={styles.submit_button}>
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

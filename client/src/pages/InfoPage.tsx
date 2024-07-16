import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/InfoPage.module.css";
import { useUserStore } from "../stores/userStore";

const hobbies = ["🎨", "🎮", "🎵", "📚", "🚴‍♂️", "⚽", "🏀", "🏊‍♂️", "🍳", "🧩"];
const mbtiTypes = [
  "INTJ",
  "ENFP",
  "ISTP",
  "ESFJ",
  "INFJ",
  "ENTP",
  "ISFJ",
  "ESTJ",
];

const InfoPage: React.FC = () => {
  const { name } = useUserStore();
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedMBTI, setSelectedMBTI] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState({
    instagram: "",
    kakaotalk: "",
  });
  const [isModified, setIsModified] = useState(false);

  const hobbySliderRef = useRef<HTMLDivElement>(null);
  const mbtiSliderRef = useRef<HTMLDivElement>(null);

  const handleWheel = (
    ref: React.RefObject<HTMLDivElement>,
    event: React.WheelEvent
  ) => {
    if (ref.current) {
      ref.current.scrollBy({ left: event.deltaY, behavior: "smooth" });
    }
  };

  const handleHobbyClick = (hobby: string) => {
    setSelectedHobbies((prev) => {
      if (prev.includes(hobby)) {
        return prev.filter((h) => h !== hobby);
      } else {
        return [...prev, hobby];
      }
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsModified(true);
  };

  const handleConfirmClick = () => {
    console.log("Confirmed with values:", inputValues);
    setIsModified(false);
  };

  useEffect(() => {
    if (hobbySliderRef.current) {
      hobbySliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    if (mbtiSliderRef.current) {
      mbtiSliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.infopage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.text}>{name}</span>
          </div>
          <div className={styles.slider_section}>
            <div className={styles.slider}>
              <span className={styles.label}>Hobby</span>
              <div className={styles.hobby_slider_wrapper}>
                <div
                  className={styles.hobby_slider}
                  ref={hobbySliderRef}
                  onWheel={(event) => handleWheel(hobbySliderRef, event)}
                >
                  {hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className={`${styles.hobby_icon} ${
                        selectedHobbies.includes(hobby) ? styles.selected : ""
                      }`}
                      onClick={() => handleHobbyClick(hobby)}
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.slider}>
              <span className={styles.label}>MBTI</span>
              <div className={styles.mbti_slider_wrapper}>
                <div
                  className={styles.mbti_slider}
                  ref={mbtiSliderRef}
                  onWheel={(event) => handleWheel(mbtiSliderRef, event)}
                >
                  {mbtiTypes.map((type, index) => (
                    <span
                      key={index}
                      className={`${styles.mbti_icon} ${
                        selectedMBTI === type ? styles.selected : ""
                      }`}
                      onClick={() => setSelectedMBTI(type)}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.input_section}>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                placeholder="Instagram"
                name="instagram"
                className={styles.input_instagram}
                value={inputValues.instagram}
                onChange={handleInputChange}
              />
              <button
                className={styles.confirm_button}
                disabled={!isModified}
                onClick={handleConfirmClick}
              >
                확인
              </button>
            </div>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                placeholder="KakaoTalk"
                name="kakaotalk"
                className={styles.input_kakaotalk}
                value={inputValues.kakaotalk}
                onChange={handleInputChange}
              />
              <button
                className={styles.confirm_button}
                disabled={!isModified}
                onClick={handleConfirmClick}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

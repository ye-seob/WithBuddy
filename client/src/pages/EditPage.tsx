import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/EditPage.module.css";
import { useLoginStore } from "../stores/loginStore";
import axios from "axios";

const EditPage: React.FC = () => {
  const { name, setName, studentId } = useLoginStore();

  const [tempName, setTempName] = useState(name);
  const [newPin, setNewPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");

  const handleSave = async () => {
    if (newPin.length != 4) {
      alert("pin 번호는 네자리입니다");
      return;
    }
    if (newPin != pinConfirm) {
      alert("pin 번호가 일치하지 않습니다");
      return;
    }
    try {
      const response = await axios.put("http://localhost:3000/api/edit", {
        newName: tempName,
        newPin,
        pinConfirm,
        studentId,
      });
      if (response.status === 200) {
        setName(tempName);
      }
    } catch (error) {
      console.error("정보 수정 실패:", error);
    }
  };

  return (
    <div className={styles.editpage_container}>
      <Header />
      <div className={styles.content_wrapper}>
        <Sidebar />
        <div className={styles.main_content}>
          <div className={styles.header_section}>
            <span className={styles.title}>회원 정보 수정</span>
          </div>
          <div className={styles.form}>
            <Input
              type="text"
              placeholder="이름"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
            <Input
              type="text"
              readOnly={true}
              placeholder="학번"
              value={studentId}
              onChange={(e) => {
                e.target;
              }}
            />
            <Input
              type="password"
              placeholder="새로운 PIN번호"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
            />
            <Input
              type="password"
              placeholder="새로운 PIN번호 확인"
              value={pinConfirm}
              onChange={(e) => setPinConfirm(e.target.value)}
            />
            <Button text="저장" onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;

import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import styles from "../public/css/EditPage.module.css";
import { useUserStore } from "../stores/userStore";
import { editUserInfo } from "../api/edit";
import AlertMessage from "../components/AlertMessage";

const EditPage: React.FC = () => {
  const { name, setName, studentId } = useUserStore();

  const [tempName, setTempName] = useState(name);
  const [newPin, setNewPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertErrorMessage, setAlertErrorMessage] = useState("");

  const handleSave = async () => {
    if (newPin.length !== 4) {
      setAlertErrorMessage("pin 번호는 네자리입니다.");
      return;
    }
    if (newPin !== pinConfirm) {
      setAlertErrorMessage("pin 번호가 일치하지 않습니다");
      return;
    }
    try {
      await editUserInfo(studentId, tempName, newPin);
      setName(tempName);
      setAlertMessage("변경되었습니다.");
    } catch (error) {
      setAlertErrorMessage("변경에 실패하였습니다");
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
      {alertMessage && (
        <AlertMessage
          message={alertMessage}
          type="success"
          onClose={() => setAlertMessage("")}
        />
      )}
      {alertErrorMessage && (
        <AlertMessage
          message={alertErrorMessage}
          type="error"
          onClose={() => setAlertErrorMessage("")}
        />
      )}
    </div>
  );
};

export default EditPage;

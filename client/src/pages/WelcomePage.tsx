import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../public/css/global.css";
import styles from "../public/css/WelcomePage.module.css";
import Header from "../components/Header";

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.centeredText}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1.5 }}
      >
        <Header />
      </motion.div>
    </div>
  );
};

export default WelcomePage;

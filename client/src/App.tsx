import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MatchPage from "./pages/MatchPage";
import EditPage from "./pages/EditPage";
import RankingPage from "./pages/RankingPage";
import SettingPage from "./pages/SettingPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

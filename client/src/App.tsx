import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MatchPage from "./pages/MatchPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;

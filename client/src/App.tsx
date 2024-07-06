import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MatchPage from "./pages/MatchPage";
import EditPage from "./pages/EditPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </Router>
  );
};

export default App;

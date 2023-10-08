import NavBar from "./components/ui/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

import NavBar from "./components/ui/NavBar";
import UserContextProvider from "./context/UserContext";
import FilesPage from "./pages/FilesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import "./styles/index.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <UserContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/files" element={<FilesPage />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;

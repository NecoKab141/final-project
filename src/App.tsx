import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { ReportsPage } from "./pages/StatisticPage/ReportsPage";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" replace /> : <RegisterPage />}
        />

        <Route
          path="/home"
          element={user ? <MainPage /> : <Navigate to="/" replace />}
        />

        <Route
          path="/reports"
          element={user ? <ReportsPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
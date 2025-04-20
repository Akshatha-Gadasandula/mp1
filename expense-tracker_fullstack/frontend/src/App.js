import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import FinancialAdvisor from "./Components/FinancialAdvisor/FinancialAdvisor";
import Homepage from "./Components/Homepage/Homepage";
import { useGlobalContext } from "./context/globalContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AuthCallback from "./Components/Auth/AuthCallback";
import GlobalStyles from "./styles/GlobalStyles";

// Main App Content
const AppContent = () => {
  const [active, setActive] = useState(2);
  const global = useGlobalContext();
  const { user, logout } = useAuth();

  const displayData = () => {
    switch (active) {
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
        return <FinancialAdvisor />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation
          active={active}
          setActive={setActive}
          user={user}
          onLogout={logout}
        />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/financial-advisor"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background: 
    linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(129, 199, 132, 0.05) 100%),
    url('/images/finance-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.6);
    z-index: -1;
  }

  main {
    flex: 1;
    background: rgba(255, 255, 255, 0.95);
    border: 2px solid rgba(76, 175, 80, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    overflow-x: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;

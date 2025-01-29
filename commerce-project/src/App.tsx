import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { user } = useAuth();
  return user ? <>{element}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/dashboard" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import ExploreProducts from "./pages/ExploreProducts/ExploreProducts";
import FilterScreen from "./pages/FilterScreen/FilterScreen";

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { user } = useAuth();
  return user ? <>{element}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [filter, setFilter] = useState({ category: "", sortBy: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/dashboard" element={<Navigate to="/home" />} />
          <Route path="/search" element={<Search />} />
          <Route 
            path="/explore-products" 
            element={<ExploreProducts filter={filter} onOpenFilter={() => setIsFilterOpen(true)} />} 
          />
        </Routes>
        {isFilterOpen && <FilterScreen setFilter={setFilter} onClose={() => setIsFilterOpen(false)} />}
      </Router>
    </AuthProvider>
  );
};

export default App;
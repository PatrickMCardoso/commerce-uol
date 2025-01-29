import React from "react";
import { useAuth } from "../../context/AuthContext";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Bem-vindo, {user ? user.displayName || user.email : "Usuário"}
      </h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
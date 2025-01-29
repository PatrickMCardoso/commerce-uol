import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login, loginWithGoogle, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    if (user) {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 128, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/src/assets/dj-image.png)",
      }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Audio</h1>
        <p className="text-white text-center text-sm mb-6">
          It&apos;s modular and designed to last
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white text-black text-sm rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white text-black text-sm rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-green-300 hover:underline">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 p-3 text-white text-sm rounded-md hover:bg-green-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="my-6">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full p-3 bg-white text-black text-sm rounded-md hover:bg-gray-100 transition"
          >
            <img src="/src/assets/google-icon.png" alt="Google Icon" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-xs text-white">
          Didn’t have an account?{' '}
          <a href="#" className="text-green-300 hover:underline">
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const { login, signUp, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(18, 80, 56, 1), rgba(0, 0, 0, 0.76)), url(/src/assets/dj-image.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-sm w-full p-8 bg-transparent">
        <h1 className="text-6xl font-semibold text-white text-center mb-2">Audio</h1>
        <p className="text-white text-center text-sm mb-30">
          It&apos;s modular and designed to last
        </p>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 bg-white text-black text-sm rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 bg-white text-black text-sm rounded-md outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-center">
            {!isSignUp && (
              <a href="#" className="text-xs text-white hover:underline">
                Forgot Password
              </a>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 p-3 text-white text-sm rounded-md hover:bg-green-600 transition font-bold"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="my-6 text-center">
          <button
            type="button"
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full p-3 bg-white text-black text-sm rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" /> Sign in with Google
          </button>
        </div>

        <p className="text-center text-xs text-white">
          {isSignUp ? "Already have an account?" : "Didn’t have an account?"} {" "}
          <a
            href="#"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-green-300 hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"} here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

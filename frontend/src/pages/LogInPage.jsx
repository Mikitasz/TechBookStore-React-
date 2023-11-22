import React, { useState, useEffect } from "react";
import LogInAPI from "../services/API/LogInAPI";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await LogInAPI.login(username, password);

      Cookies.set("token", userData.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      setLoggedIn(true);
      setError(null);

      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 mt-[-80px]">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
          Log in
        </h2>
        {loggedIn ? (
          <div>
            <p className="text-green-500 text-center">You are logged in.</p>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-3 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-3 border rounded mb-4"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

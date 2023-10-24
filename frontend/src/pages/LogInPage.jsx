import React, { useState, useEffect } from 'react';
import LogInAPI from '../services/LogInAPI';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // To track authentication status

  // Check authentication on page load
  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for the presence of the token in local storage
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await LogInAPI.login(username, password);
      console.log(userData);

      // Store the authentication token in local storage
      localStorage.setItem('token', userData.token);

      setLoggedIn(true);
      console.log('Login successful');
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error('Login failed:', error);
    }
  }

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;

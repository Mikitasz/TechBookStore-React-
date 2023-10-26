import React, { useState, useEffect } from 'react';
import LogInAPI from '../services/API/LogInAPI';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // To track authentication status
 
  // Check authentication on page load
  useEffect(() => {
    
    const token = Cookies.get("token"); // Retri // Check for the presence of the token in local storage
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await LogInAPI.login(username, password);
   

      // Store the authentication token in local storage
      Cookies.set('token', userData.token, { expires: 7, secure: true, sameSite:"Strict" });


      setLoggedIn(true);
      
      console.log('Login successful');
    } catch (error) {
      // Handle login error, e.g., show an error message
      console.error('Login failed:', error);
    }
  }

  

  return (
    <div>
      {loggedIn ? (
        <div>
          
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


import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/users_a/login/';

const login = async (username, password) => {
  try {
    const response = await axios.post(BASE_URL, {
      username,
      password,
    });

    // Handle the response here
    if (response.status === 200) {
      // Successful login, you can do something here
      return response.data;
    } else {
      // Handle other cases (e.g., show an error message)
      throw new Error('Login failed');
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error logging in:', error);
    throw error;
  }
};

export default {
  login,
};

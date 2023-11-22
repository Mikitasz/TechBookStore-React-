import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/login/";

const login = async (username, password) => {
  try {
    
    const response = await axios.post(BASE_URL, {
      username,
      password,
    });
   
    if (response.status === 200) {
      window.location.href = "/";
      
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const exportedObject = {
  login,
};
export default exportedObject;

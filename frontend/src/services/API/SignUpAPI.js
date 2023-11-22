import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/register/";

const SignUp = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default SignUp;

import axios from "axios";

export const getBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

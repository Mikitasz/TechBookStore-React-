import axios from "axios";

export const getCategory = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/books-api/category/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

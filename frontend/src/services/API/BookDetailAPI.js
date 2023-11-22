// services/API/GetBookDetailAPI.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const getBookDetail = async (bookId) => {
  const response = await axios.get(`${BASE_URL}books-api/books/${bookId}/`);

  return response.data;
};
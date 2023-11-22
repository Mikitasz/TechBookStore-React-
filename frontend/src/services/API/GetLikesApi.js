// services/API/GetBookDetailAPI.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const getLikes = async (bookId) => {
  
  const response = await axios.get(
    `${BASE_URL}books-api/get-likes-for-one-book/${bookId}/`,
  );
  console.log(response);
  return response.data;
};

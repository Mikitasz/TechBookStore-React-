// services/API/GetBookDetailAPI.js
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

export const getUserorderBooks = async (user_id) => {
  const response = await axios.get(
    `${BASE_URL}books-api/user_order_books_count/${user_id}/`
  );

  return response.data;
};

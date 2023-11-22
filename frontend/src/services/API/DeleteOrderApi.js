import axios from "axios";
import Cookies from "js-cookie";
export const deleteorder = async (user_id, book_id) => {
  try {
    const token = Cookies.get("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await axios.delete(
      `http://127.0.0.1:8000/books-api/user-order/${user_id}/${book_id}/`,
      { headers: headers }
    );
    if (response.status === 200) {
      // Успешно добавлено или удалено из списка любимых
      return true;
    } else {
      // Ошибка при добавлении или удалении
      return false;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return false;
  }
};

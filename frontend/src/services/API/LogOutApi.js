import axios from "axios";
import Cookies from "js-cookie";

export const logoutUser = async () => {
  try {
    const token = Cookies.get("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await axios.post(
      "http://127.0.0.1:8000/api/logout",
      null,
      { headers }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

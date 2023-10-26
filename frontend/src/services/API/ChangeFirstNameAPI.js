import axios from "axios";
import Cookies from "js-cookie";
export const ChangeFirstName = async (NewFirstName) => {
  try {
    const token = Cookies.get("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    const data = {
      first_name: NewFirstName,
    };
    console.log(data);
    const response = await axios.post(
      "http://127.0.0.1:8000/users_a/change-first-name/",
      data,
      { headers: headers }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

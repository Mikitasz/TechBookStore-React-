import axios from "axios";
import Cookies from "js-cookie";
export const ChangeLastName = async (NewLastName) => {
  try {
    const token = Cookies.get("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    const data = {
      last_name: NewLastName,
    };
    console.log(data);
    const response = await axios.post(
      "http://127.0.0.1:8000/users_a/change-last-name/",
      data,
      { headers: headers }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

import axios from "axios";
import Cookies from "js-cookie";

export const GetId = async () => {
  try {
    const token = Cookies.get("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    const response = await axios.get(
      "http://127.0.0.1:8000/api/getid",

      { headers: headers }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

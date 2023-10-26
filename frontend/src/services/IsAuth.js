import Cookies from "js-cookie";
export function isUserLoggedIn() {
  const token = Cookies.get("token");
  return !!token;
}

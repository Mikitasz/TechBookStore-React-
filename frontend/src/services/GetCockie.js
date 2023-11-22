import Cookies from "js-cookie";

const GetCookie = (cookname)=>{

    return Cookies.get(cookname);
};
export default GetCookie
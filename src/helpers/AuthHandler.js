import Cookies from "js-cookie";

export const isLogued = () => {
    let token = Cookies.get('token');
    return (token) ? true : false
}
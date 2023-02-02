import Cookies from "js-cookie";

export const isLogued = () => {
    let token = Cookies.get('token');
    return (token) ? true : false
}

export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword){
        Cookies.set('token', token, {expires: 999});
    }else {
        Cookies.set('token', token)
    }
}   
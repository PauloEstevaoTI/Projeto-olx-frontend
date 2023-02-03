import Cookies from "js-cookie";
import qs from 'qs'
import { useAsyncValue } from "react-router-dom";

const BASEAPI = 'http://alunos.b7web.com.br:501'

const apiFecthPost = async (endpoint, body) => {
    
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });

    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin'
        return;
    }

    return json;
}

const apiFecthGet = async (endpoint, body = []) => {
    
    if(!body.token){
        let token = Cookies.get('token');
        if(token){
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);

    const json = await res.json();

    if(json.notallowed){
        window.location.href = '/signin'
        return;
    }

    return json;
}




const OlxAPI = {

    login:async(email, password) => {
        // fazer a consulta ao WB
        const json = await apiFecthPost(
            '/user/signin',
            {email, password}
        );

        return json;        
        
    },

    register: async (name, email, password, stateLoc) => {
        const json = await apiFecthPost(
            '/user/signup',
            {name, email, password, state:stateLoc}
        )

        return json;
    },

    getStates:async() => {
        const json = await apiFecthGet(
            '/states'
        );

        return json.states;
    }
};


export default () => OlxAPI;
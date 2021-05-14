import axios from 'axios';
const URL = 'https://limitless-stream-08042.herokuapp.com/auth'

export const login = async (data) => {
    try {
        const res = await axios.post(`${URL}/signin`, {
            email: data.email,
            password: data.password
        })

        return res;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const register = async (data) => {
    try {
        const res = await axios.post(`${URL}/signup`, {
            email: data.email,
            password: data.password,
            firstname: data.firstName,
            lastname: data.lastName
        })

        console.log(res);
        return res;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
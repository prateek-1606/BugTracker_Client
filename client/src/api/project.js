import axios from 'axios';
const URL = 'https://limitless-stream-08042.herokuapp.com/project';

export const getProjects = async() => {
    try{
        const res = await axios.get(`${URL}`)
        return res;
    }
    catch(err) {
        console.log(err);
    }
}

export const createProject = async(data) => {
    try{
        const {token} = JSON.parse(localStorage.getItem('user'));
        console.log(token)
        const res = await axios.post(`${URL}`,{
            title:data.title,
            status:data.status ? data.status : 'Open',
            priority:data.priority ? data.priority : 'Low',
            details:data.details,
            user:data.user
        },{ headers: {"Authorization" : `Bearer ${token}`} })

        return res;
    }
    catch(err) {
        console.log(err);
    }
}

export const updateProject = async(data) => {
    try{
        const {token} = JSON.parse(localStorage.getItem('user'));

        const res = await axios.put(`${URL}/${data.id}`,{
            title:data.title,
            status:data.status ? data.status : 'Open',
            priority:data.priority ? data.priority : 'Low',
            details:data.details,
            user:data.user
        },{ headers: {"Authorization" : `Bearer ${token}`} })

        return res;
    }
    catch(err) {
        console.log(err);
    }
}

export const deleteProject = async(id) => {
    try{
        const {token} = JSON.parse(localStorage.getItem('user'));
        const res = await axios.delete(`${URL}/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        return res;
    }
    catch(err) {
        console.log(err);
    }
}

export const getProject = async(id) => {
    try{
        const res = await axios.get(`${URL}/${id}`)       
        return res;
    }
    catch(err) {
        console.log(err);
    }
}
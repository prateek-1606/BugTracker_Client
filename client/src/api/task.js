import axios from 'axios';
const URL = 'https://limitless-stream-08042.herokuapp.com/tasks';

export const CreateTask = async (data) => {
    try {
        const {token} = JSON.parse(localStorage.getItem('user'));
        console.log(token);
        const res = await axios.post(`${URL}/${data.id}`,{
            project:data.project,
            title: data.title,
            status: data.status,
            priority: data.priority,
            source: data.source,
            details: data.details,
            reporter: {
                name:data.reporter
            },
            assignee: {
                name:data.AssignedTo
            },
        },{ headers: {"Authorization" : `Bearer ${token}`} })
        
        return res;
    }
    catch(err) {
        console.log(err);
    }
} 
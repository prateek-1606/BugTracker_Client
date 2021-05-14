import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import {getProjects} from '../../api/project'
import {Typography,Paper} from '@material-ui/core'
import useStyles from './styles';
import Tasks from '../ProjectDetails/Tasks/Tasks';

const Todos = () => {

    const [User,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [todos,setTodos] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getProjects()
        .then(({data}) => {
            console.log(data);
            let todos = [];
            data.forEach(element => {
                element.tasks.forEach(task => {
                    if(task.assignee.name === User.user.firstname+ ' ' +User.user.lastname ){
                        todos.push(task);
                    }
                })
            });
            setTodos(todos);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    if(!User){
        return (
            <Redirect to='/' />
        )
    }

    return (
        <>
        { todos.length > 0 ? (
            <Tasks tasks={todos} />
        ): (
            <Paper className={classes.root} >
                <Typography align="center" variant="h4" >Congrats No Todos, Enjoy The Day</Typography>
            </Paper>
        )}
        </>
    )
}

export default Todos;
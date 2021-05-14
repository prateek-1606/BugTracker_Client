import { Button, ButtonGroup, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles'
import {getProject} from '../../api/project';
import Tasks from './Tasks/Tasks';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddTask from '../Modals/AddTasks/AddTask';
import UpdateProject from '../Modals/UpdateProject/UpdateProject';
import DeleteProject from '../Modals/DeleteProject/DeleteProject';
 
const Project = (props) => {
    const classes = useStyles();
    const [project,setProject] = useState({tasks:[]});
    const {id} = props.match.params;

    const [showAddTask,setShowaddTask] = useState(false);
    const [open,setOpen] = useState(false);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [showUpdateProject,setShowUpdateProject] = useState(false);
    const [showDeleteProject,setShowDeleteProject] = useState(false);
    
    const toggle = () => {
        setOpen(!open);
    }

    useEffect(() => {
        getProject(id)
        .then((res) => {
            console.log(res)
            setProject(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    return (
    <div className={classes.root} >
        <Typography variant="h3" color="secondary" >
            {project.title}
        </Typography>
        <div className="dropdown-toggler flex v-center pointer" className={classes.dropdown} onClick={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
        </div>
        { open ? (
            <div className={classes.toggler} >
                <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" >
                <Button size="small" startIcon={<AddIcon />} onClick={() => setShowaddTask(!showAddTask)} >Add Task</Button>
                <Button size="small" startIcon={<EditIcon />} onClick={() => setShowUpdateProject(!showUpdateProject)} >Edit Project</Button>
                <Button size="small" startIcon={<DeleteIcon/>} onClick={() => setShowDeleteProject(!showDeleteProject)} >Delete Project</Button>
                </ButtonGroup>
            </div>
        ) : null }
        { showAddTask && <AddTask id={id} project={project.title} user={user} /> }
        { showUpdateProject && <UpdateProject id={id} /> }
        { showDeleteProject && <DeleteProject id={id} /> }
        <div className="project-details">
            <span className="tag">Status: {project.status}</span>
            <span className="tag">Priority: {project.priority}</span>
            <p><Typography variant="h6" >{project.details}</Typography></p>
        </div>
        { project.tasks.length===0 ? (
            <Typography align="center" variant="h5" >Project has no tickets</Typography>
        ): <Tasks tasks={project.tasks} /> }
    </div>
    )
}

export default Project;
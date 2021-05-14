import React,{useEffect, useState} from 'react';
import {Paper,Table,TableCell,TableHead,TableBody,TableRow, Typography,Button, Dialog, DialogTitle, DialogContent, DialogActions,InputLabel,MenuItem,Select,FormControl} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import useStyles from './styles'
import {getProjects} from '../../api/project';
import Input from '../Auth/input';
import {createProject} from '../../api/project';
import {withStyles} from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const Home = () => {
    const classes = useStyles();
    const [projects,setProjects] = useState([]);

    const [User,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [isOpen,setIsOpen] = useState(false);
    const [data,setData] = useState({ title:'',status:'',priority:'',details:'' ,user:null});
    const [error,setError] = useState(null);

    useEffect(() => {
        getProjects()
        .then((res) => {
            const proj = res.data.filter(pro => pro.user === User.user.email) 
            setProjects(proj);
        })
        .catch((err) => {
            console.log(err);
        })
        setUser(JSON.parse(localStorage.getItem('user')));
    },[])

    const handleSubmit = () => {
        console.log(data);
        data.user = User.user.email;
        createProject(data)
        .then((res) => {
            setIsOpen(false);
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
            setError('Project not been added,Try again')
        })
    }
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
      
      const StyledTableRow = withStyles((theme) => ({
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }))(TableRow);

      if(!User) {
          return(
            <Redirect to="/auth" />
          )
      }

    return (
        <>
        {User ? (
        <>
            <Typography className={classes.heading} align="center" variant="h3" color="secondary" >
                Projects
            </Typography>
            <Button variant="contained" color="secondary" className={classes.button} onClick={() => setIsOpen(true)} >Add New Project</Button>
            <Dialog open={isOpen} onClose={!isOpen} >
                <DialogTitle className={classes.dialog} >Create New Project</DialogTitle>
                <DialogContent >
                    <form>
                    <Input margin="normal" name="Title" label="Title" handleChange={(e) => setData({ ...data,title:e.target.value})} autoFocus half/>
                    <FormControl className={classes.formControl} >
                       <InputLabel id="status" >Status</InputLabel>
                       <Select
                          labelId="status"
                          id="status"
                          value={data.status}
                          onChange={(e) => setData({...data, status:e.target.value})}
                        >
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                       </Select>
                    </FormControl>
                    <FormControl className={classes.formControl} >
                    <InputLabel id="priority" >Priority</InputLabel>
                       <Select
                          labelId="priority"
                          id="priority"
                          value={data.priority}
                          onChange={(e) => setData({...data, priority:e.target.value})}
                        >
                          <MenuItem value="Low">Low</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Urgent">Urgent</MenuItem>
                       </Select>
                    </FormControl>
                    <Input margin="normal" name="detail" label="Details" handleChange={(e) => setData({ ...data,details:e.target.value})} autoFocus half/>
                    { error && <Alert severity="error">{error}</Alert>}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={handleSubmit} >Create</Button>
                    <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        
        ): null}
        { projects.length===0 ? (
        <Paper className={classes.root} >
            <Typography align="center" variant="h4" >No Employes Yet, Start Adding Some!</Typography>
        </Paper>
        ) : (
            <Paper className={classes.root} >
            <Table >
            <TableHead>
                <TableRow  >
                    <StyledTableCell><Typography  variant="h6" >Project</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6" >Status</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6">Priority</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6">Tasks</Typography></StyledTableCell>
                    <StyledTableCell><Typography  variant="h6">Action</Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projects ? projects.map(project => {
                    return(
                        <StyledTableRow>
                            <StyledTableCell><Typography  >{project.title}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{project.status}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{project.priority}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{project.tasks.length}</Typography></StyledTableCell>
                            <StyledTableCell ><Link to={ User ? (`/project/${project._id}`) : ('/auth') }>Details</Link></StyledTableCell>
                        </StyledTableRow>
                    );
                } ) : null}
            </TableBody>
            </Table>
        </Paper>
        )}
    </>
    )
}

export default Home;
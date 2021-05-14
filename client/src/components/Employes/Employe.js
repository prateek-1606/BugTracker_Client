import React, { useState,useEffect } from 'react' 
import {Table,TableBody,TableHead,TableRow,TableCell, Paper, Typography, Button,Fab,DialogActions,DialogContent,DialogTitle,Dialog} from '@material-ui/core';
import useStyles from './styles';
import {withStyles} from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add'
import Input from '../Auth/input'
import {CreateEmploye,DeleteEmploye} from '../../api/index';
import {Redirect} from 'react-router-dom';

const Employe = () => {
    const classes = useStyles();
    const [User,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [employes,setEmployes] = useState(User === null ? [] : User.user.employes);
    const [isOpen,setIsOpen] = useState(false);
    const [data,setData] = useState({email:'' , name:'',id:''})

    const handleDelete = (email) => {
        DeleteEmploye({id:User.user._id ,email:email })
        .then(() => {
            console.log('Employe Deleted');
            const newUser = User.user.employes.filter((employe) => employe.email !== email)
            User.user.employes = newUser;
            localStorage.setItem('user',JSON.stringify(User));
        })        
        .catch((err) => {
            console.log(err);
        })
    }

    const handleSubmit = () => {
        data.id=User.user._id
        console.log(data);
        CreateEmploye(data)
        .then((res) => {
            console.log(res);
            User.user.employes.push({email:data.email,name:data.name});
            localStorage.setItem('user',JSON.stringify(User));
            setIsOpen(false);
        })
        .catch((err) => {
            console.log(err);
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
        {
            employes.length === 0 ? (
                <Paper className={classes.root} >
                    <Typography align="center" variant="h4" >No Employes Yet, Start Adding Some!</Typography>
                    <div className={classes.button} align="center" >
                    <Button variant="contained" color="secondary" onClick={() => setIsOpen(true)} >Add Employe</Button>
                    </div>
                </Paper>
            ) : (
        <>
        <Typography align="center" variant="h3" color="secondary" className={classes.title} >Employes</Typography>
        <div className={classes.add} >
        <Button onClick={() => setIsOpen(true)} >
            <Fab size="large" color="secondary" aria-label="add" className={classes.margin}>
                <AddIcon />
            </Fab>
        </Button>
        </div>
        <Paper className={classes.root} >
            <Table >
            <TableHead>
                <TableRow  >
                    <StyledTableCell><Typography  variant="h6" >Employe Email</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6" >Employe Name</Typography></StyledTableCell>
                    <StyledTableCell><Typography  variant="h6">Action</Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {employes ? employes.map(employe => {
                    return(
                        <StyledTableRow>
                            <StyledTableCell><Typography  >{employe.email}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{employe.name}</Typography></StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => handleDelete(employe.email)} >
                                    <DeleteForeverIcon/>
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    );
                } ) : null}
            </TableBody>
            </Table>
        </Paper>
        </>)
        }
        {isOpen && (
            <Dialog open={isOpen} onClose={!isOpen} >
             <DialogTitle className={classes.dialog} >Add Employe</DialogTitle>
             <DialogContent >
                 <Input helperText="Enter Registered Email Address of User" margin="normal" name="email" label="email" handleChange={(e) => setData({ ...data,email:e.target.value})} autoFocus/>
                 <Input helperText="Enter Registered Name of User" margin="normal" name="name" label="name" handleChange={(e) => setData({ ...data,name:e.target.value})} autoFocus/>
             </DialogContent>
             <DialogActions>
                 <Button variant="outlined" color="primary" onClick={handleSubmit} >Create</Button>
                 <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                     Close
                 </Button>
             </DialogActions>
            </Dialog>
        )}
        </>
    )
}

export default Employe;
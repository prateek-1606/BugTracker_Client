import React, { useState } from 'react';
import useStyles from './styles';
import {updateProject} from '../../../api/project';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions,InputLabel,MenuItem,Select,FormControl} from '@material-ui/core';
import Input from '../../Auth/input';

const UpdateProjectComponent = ({id}) => {

    const classes = useStyles();
 
    const [data,setData] = useState({id, title:'',status:'',priority:'',details:'' });
    const [isOpen,setIsOpen] = useState(true);

    const handleSubmit = () => {
        console.log(data);
        updateProject(data)
        .then((res) => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        }) 
        setIsOpen(false);
    }
    return (
        <>
            <Dialog open={isOpen} onClose={!isOpen} >
                <DialogTitle className={classes.dialog} >Update Project</DialogTitle>
                <DialogContent >
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
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={handleSubmit} >Update</Button>
                    <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateProjectComponent;
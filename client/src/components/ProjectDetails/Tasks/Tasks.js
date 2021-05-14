import { Typography,Table,TableCell,TableBody,TableRow,Paper,TableHead } from '@material-ui/core';
import React from 'react';
import {withStyles} from '@material-ui/core/styles'
import useStyles from './styles';
 
const Tasks = ({tasks}) => {

    const classes = useStyles();
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

    return(
        <>
        <Paper className={classes.root} >
            <Table>
            <TableHead>
                <TableRow  >
                    <StyledTableCell><Typography  variant="h6" >Task</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6" >Status</Typography></StyledTableCell>
                    <StyledTableCell><Typography variant="h6">Reported By</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6">Source</Typography></StyledTableCell>
                    <StyledTableCell ><Typography  variant="h6">Priority</Typography></StyledTableCell>
                    <StyledTableCell><Typography  variant="h6">Assignee</Typography></StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tasks ? tasks.map(task => {
                    return(
                        <StyledTableRow>
                            <StyledTableCell><Typography  >{task.title}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{task.status}</Typography></StyledTableCell>
                            <StyledTableCell><Typography  >{task.reporter.name}</Typography></StyledTableCell>
                            <StyledTableCell><Typography >{task.source}</Typography></StyledTableCell>
                            <StyledTableCell><Typography>{task.priority}</Typography></StyledTableCell>
                            <StyledTableCell><Typography>{task.assignee.name}</Typography></StyledTableCell>
                        </StyledTableRow>
                    );
                } ) : null}
            </TableBody>
            </Table>
        </Paper>
        </>
    )
}

export default Tasks;
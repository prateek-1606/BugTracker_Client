import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {Link,useLocation,useHistory} from 'react-router-dom';
import decode from 'jwt-decode';
import BugReportIcon from '@material-ui/icons/BugReport';

const Navbar = () => {

    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [user,setuser] = useState(JSON.parse(localStorage.getItem('user')));
    var pathname = window.location.pathname;

    var path = pathname === '/' ? 'home' : pathname.substr(1) 
    const [active,setActive] = useState(path);

    const logout = () => {
        setuser(null);
        localStorage.clear();
        history.push('/auth');
    }

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        pathname = window.location.pathname;
        path = pathname === '/' ? 'home' : pathname.substr(1) 
        setActive(path)
        setuser(JSON.parse(localStorage.getItem('user')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" >
            <BugReportIcon className={classes.icon} color="secondary" />
            <Typography className={classes.heading} component={Link} to="/" marginLeft="50" variant="h4" color={active==='home' ? 'secondary' : 'inherit'} >
                Bug Tracker
            </Typography>
            <div className={classes.employes} >
               <Typography component={Link} to="/employe" className={classes.heading} variant="h5" color={active==='employe' ? 'secondary' : 'inherit'} >Employes</Typography>
               <Typography component={Link} to="/todos" className={classes.todos} variant="h5" color={active==='todos' ? 'secondary' : 'inherit'} >Todos</Typography>
            </div>
            <Toolbar className={classes.toolbar} >
            {
                user ? (
                    <div className={classes.profile}>
                      <Typography className={classes.userName} variant="h6">{user?.user.firstname}</Typography>
                      <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <div  >
                       <Typography component={Link} to="/auth" className={classes.heading} variant="h5" color={active==='auth' ? 'secondary' : 'inherit'} >Sign In</Typography>
                    </div>
                )
            }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;
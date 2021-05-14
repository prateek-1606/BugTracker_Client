import React, { useState } from 'react';
import {Container,Typography,Paper,Avatar,Grid,Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import {login,register} from '../../api/index'; 
import {useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert'

const Auth = () => {
    const [data,setData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const history = useHistory();
    const [isSignup,setisSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [error,setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
          if(data.password !== data.confirmPassword){
            setError("Passwords must match");
          }
          else {
            register(data).then((res) => {
              console.log(res);
              localStorage.setItem('user',JSON.stringify({ ...res?.data}));
              history.push('/');
            })
            .catch((err) => {
              console.log(err);
              setError("Please Enter Correct Details")
  
            })
          }
        }
        else {
          login(data).then((res) => {
            localStorage.setItem('user',JSON.stringify({ ...res?.data }));
            history.push('/');
          })
          .catch((err) => {
            console.log(err.message);
            setError("Please Enter Correct Details")
          })
        }
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
        console.log([e.target.name])
    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const switchMode = () => {
        setData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
        setisSignup((isSignup) => !isSignup)
        setError(null)
    }

    const classes = useStyles();
    return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          { error && <Alert severity="error">{error}</Alert>}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    )
}

export default Auth;
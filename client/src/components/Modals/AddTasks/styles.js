import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root:{
    margin:theme.spacing(10)
  },
  link:{
      textDecoration:"none"
  },
  dialog:{
    minWidth:500,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  button:{
    float:'right',
    marginTop:25,
    marginRight:80
  }
}));

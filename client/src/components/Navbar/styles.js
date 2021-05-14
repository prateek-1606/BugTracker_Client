import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    textDecoration: 'none',
    fontFamily:'Times New Romen',
  },
  todos:{
    textDecoration: 'none',
    fontFamily:'Times New Romen',
    marginLeft:'40px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  employes:{
    marginRight:'auto',
    marginLeft:'40px',
  },
  icon:{
    fontSize:"40px",
    
  }
}));

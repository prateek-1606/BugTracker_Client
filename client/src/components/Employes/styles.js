import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root:{
        marginLeft:'20%',
        marginRight:'20%',
        marginTop:'3%'
    },
    paper: {
        height: 500,
        width: 600,
        marginTop:60
    },
    dialog:{
        minWidth:500,
    },
    title:{
        marginTop:50,
        fontFamily:'Times New Romen',
    },
    add:{
        float:'right',
        marginRight:'20%',
        marginTop:-50,
    },
    button:{
        margin:10
    }
}));

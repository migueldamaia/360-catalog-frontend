
import './App.css';
import React, { useState } from "react" 
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from './App';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


function Login(){
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
      padding: theme.spacing(3),
    }
  }));
  const classes = useStyles();
    
    var state = { token: "" }
    const url = 'https://catalog-360-funnel-api.herokuapp.com/';
    const urlLocal = "http://localhost:8080/"

    const [loginInfo, setLogin] = useState({
        username: "",
        password: ""
      })

      const updateLogin = (e) => {
        setLogin({
          ...loginInfo,
          [e.target.name]: e.target.value,
        })
      }

      var token;


      
    function authenticate(){
          axios.post(url+'authenticate', {
            username: loginInfo.username,
            password: loginInfo.password
          })
          .then((response) => {
              token = response.data.token;
              getForm();
          }, (error) => {
            console.log(error);
          });
           
    }

    

    function getForm(){
        ReactDOM.render(
            <React.StrictMode>
              <App token={token}/>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
  
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return(
      <Container className={classes.container} maxWidth="xs">
      <div>Login Page</div>
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <OutlinedInput
              id="username" name="username"
                fullWidth
                type={ 'text' }
               
                onChange={updateLogin}
                labelWidth={70}
              />
              </Grid>
              <Grid item xs={12}>
              <OutlinedInput
              id="pass" name="password"
              required
              fullWidth
                type={ 'password'}
                
                onChange={updateLogin}
                
                labelWidth={70}
              />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={authenticate} color="secondary" fullWidth type="submit" variant="contained">
              Log in
            </Button>
          </Grid>
        </Grid>
    </Container>
    );
}



export default Login;




import './App.css';
import React, { useState } from "react" 
import ReactDOM from 'react-dom';
import Login from './Login';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import protoImg from './static/38.png';


function Main(props){
    
    

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        field: {
          
        },
        cardrRoot: {
          maxWidth: 345,
        },
        media: {
          height: 600,
        }
      }));

      const classes = useStyles();



    function getDemo(){
        window.location.href = 'https://slicksoftware.pt/prototype/';
        //
        
    }

    function getForm(){
        ReactDOM.render(
            <React.StrictMode>
              <Login />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }

    return(
  

<div>

    <div>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={protoImg}
          title="Car 360 Prototype"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            360 Catalogs
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            We turn your website catalogs into 360 Format
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button onClick={getDemo} variant="contained" color="primary">
        See Demo
    </Button>
    <Button onClick={getForm} variant="contained" color="primary">
  Calculate your price
</Button>

      </CardActions>
    </Card>
    
   
    </div>

<div>

</div>

   
    </div>
    );
}



export default Main;
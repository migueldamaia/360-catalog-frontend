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
import protoImg from './static/38.png';
import Grid from '@material-ui/core/Grid';

function Main(props){
    
    

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 140,
      },
      cont:{
        style:"text-align:center",
      
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
  

<div >

    <div className={classes.cont}>
      
    <Grid
    
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
 >

<Grid item xs={3}>
<Typography variant="h5" component="h1" color="textPrimary" >We turn your catalogs into 360</Typography>
</Grid>

<Grid item xs={3}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia height={'30px'}
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
      <Button onClick={getDemo} color="secondary"  type="submit" variant="contained">
        See Demo
    </Button>
    <Button onClick={getForm} color="secondary"  type="submit" variant="contained">
  Calculate your price
</Button>

      </CardActions>
    </Card>
    </Grid>
    </Grid>
    
   
    </div>

<div>

</div>

   
    </div>
    );
}



export default Main;
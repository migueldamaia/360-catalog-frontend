import React, { useState ,useEffect} from "react" ;
import Main from "./Main";
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function FinalPage(props){

    
    function getDemo(){
        window.location.href = 'https://slicksoftware.pt/prototype/';
    }

    function getHomePage(){
        ReactDOM.render(
            <React.StrictMode>
              <Main />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }


    return(


        <div className="App">
        <Container   component="main">
           <Grid align="center" container spacing={5} >
           <Typography variant="h4" color="textPrimary">
        Great!
        Check your inbox, you should have received an email with the price offer! 
        </Typography>
        

        <Grid align="center" item xs={12}>
    <Button onClick={getHomePage} color="secondary"  type="submit" variant="contained">Home Page</Button>
    </Grid>
    <Grid align="center"item xs={12}>
    <Button onClick={getDemo} color="secondary"  type="submit" variant="contained">See Demo</Button>
    </Grid>
    </Grid>
   
</Container>
</div>


   
    )
}

export default FinalPage;
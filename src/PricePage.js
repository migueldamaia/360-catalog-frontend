import React, { useState ,useEffect} from "react" ;
import axios from 'axios';
import ReactDOM from 'react-dom';
import FinalPage from './FinalPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';

function PricePage(props){


    function sendEmail(){

        
        const url = 'https://catalog-360-funnel-api.herokuapp.com/';


        const headers = {
            "Authorization":props.token
          }

          const authAxios = axios.create({
            baseUrl : url,
            headers:{
              Authorization : props.token
            }
          })


          authAxios.get(url+"sendEmail?id="+props.formId, headers).then((response) => {
            ReactDOM.render(
               <React.StrictMode>
                 <FinalPage  emailSent={response.data} />
               </React.StrictMode>,
               document.getElementById('root')
             );
           
           }, (error) => {
             console.log(error);
             console.log(error.Authorization);
           });
    }

    function getDemo(){
      window.location.href = 'https://slicksoftware.pt/prototype/';
    
      
  }

    const offer = props.offer;
    const offerLinesArray = props.offer.offerLines;
    
    return(

        


        
       <div>

<Container  maxWidth="md" component="main">
           <Grid align="center" container spacing={5} >

           {
            offerLinesArray.map(offerLine => (


             
               // Enterprise card is full width at sm breakpoint
               <Grid align="center" item key={offerLine.serviceType.id} xs={12} sm md={4}>
                 <Card>
                   <CardHeader
                     title={offerLine.serviceType.name}
                   />
                   <CardContent>
                     <div >
                     <Typography component="h2" variant="h5" color="textPrimary">
                      ${offerLine.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      {offerLine.serviceType.description}
                    </Typography>
                     </div>
                     
                   </CardContent>
                   
                 </Card>
               </Grid>
             ))
      

        
       
        
        

        
}


<Grid align="center" item xs={12}>
    <Button onClick={sendEmail} color="secondary"  type="submit" variant="contained">Send Email</Button>
    </Grid>
    <Grid align="center"item xs={12}>
    <Button onClick={getDemo} color="secondary"  type="submit" variant="contained">See Demo </Button>
    </Grid>
    </Grid>
</Container>
       </div>
   )
}

export default PricePage;
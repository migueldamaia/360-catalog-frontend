import React, { useState ,useEffect} from "react" ;
import axios from 'axios';
import ReactDOM from 'react-dom';
import FinalPage from './FinalPage';

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

    const offer = props.offer;
    const offerLinesArray = props.offer.offerLines;
    
    return(
        
       <div>
           {
            offerLinesArray.map(offerLine => (
        <li >
        <label for="cb1">{offerLine.serviceType.name}</label>
        <label for="cb1">{offerLine.price}</label>
        <label for="cb1">{offerLine.serviceType.description}</label>
        
        </li>))

        
}
    <button onClick={sendEmail}>Send Email</button>
       </div>
   )
}

export default PricePage;
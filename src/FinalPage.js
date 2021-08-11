import React, { useState ,useEffect} from "react" ;
import Main from "./Main";
import ReactDOM from 'react-dom';

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
    <div>
        <h1>
        Great!
        Check your inbox, you should have received an email with the price offer! 
        </h1>
        <button onClick={getHomePage}>HOME</button>
        <button onClick={getDemo}>SEE DEMO</button>
    </div>
    )
}

export default FinalPage;
import './App.css';
import React, { useState } from "react" 
import ReactDOM from 'react-dom';
import Login from './Login';


function Main(props){


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
    <button onClick={getDemo}>SEE DEMO</button>
    </div>

<div>
    <button onClick={getForm}>Simulate Price for your catalog</button>
</div>

   
    </div>
    );
}



export default Main;
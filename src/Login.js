import './App.css';
import React, { useState } from "react" 
import axios from 'axios';
import ReactDOM from 'react-dom';
import App from './App';

function Login(){

    
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
  

    return(
  

<div>

    <div>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" onChange={updateLogin}></input>
    </div>

<div>
    <label for="pass">Password (8 characters minimum):</label>
    <input type="password" id="pass" name="password"
           minlength="8" required onChange={updateLogin}></input>
</div>

    <button onClick={authenticate}>Hello</button>
    </div>
    );
}



export default Login;
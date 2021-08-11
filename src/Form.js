import React, { Component,useState }from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import $ from 'jquery';


class Form extends Component {
    render() {
        
      
      return (
        <div>
          <h1>{this.props.token}</h1>
        </div>
      );
    }
  }export default Form;
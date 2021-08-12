import './App.css';
import React, { useState ,useEffect} from "react" 
import axios from 'axios';
import ReactDOM from 'react-dom';
import PricePage from './PricePage';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import AppBar from '@material-ui/core/AppBar';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';

import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function App(props) {

  const [productTypesArray, setProductTypesArray] = useState([])
  const [locationArray,setLocationArray] = useState([])
  const [productQuantityArray,setProductQuantityArray] = useState([])
  const [serviceTypesArray,setServiceTypesArray] = useState([])
  const url = 'https://catalog-360-funnel-api.herokuapp.com/';
  const urlLocal = "http://localhost:8080/";

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
      height: 140,
    },


    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
    

  }));

  const classes = useStyles();

  const headers = {
    "Authorization":props.token,
    "Access-Control-Allow-Origin": "*"
    //'Access-Control-Allow-Origin' : 'http://localhost:3000',
    //'Access-Control-AllowMethods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }

  const authAxios = axios.create({
    baseUrl : url,
    withCredential: true,
    headers:{
      Authorization: props.token,
      //AccessControl:'http://localhost:3000',
      //AllowMethods:'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      
    }
  })

  //FETCH INITIAL DATA

  
    useEffect(() => {

    authAxios.get(url+"rate/listProdType",{headers:headers}).then((response) => {
      setProductTypesArray(response.data);
      console.log(props.token);
      
    }, (error) => {
      console.log(error);
   
    },);

    },[])

    //location
    useEffect(() => {
      
      authAxios.get(url+"rate/listLocs", headers).then((response) => {
        setLocationArray(response.data);
        
      }, (error) => {
        console.log(error);
     
      },);
      },[])
  
      //productQuantity
      useEffect(() => {
        
        authAxios.get(url+"rate/listProdQuant", headers).then((response) => {
          setProductQuantityArray(response.data);
          
        }, (error) => {
          console.log(error);
       
        },);
        },[])

        //ServiceTypes
        useEffect(() => {
          
          authAxios.get(url+"rate/listServTypes", headers).then((response) => {
            setServiceTypesArray(response.data);
            
          }, (error) => {
            console.log(error);
         
          },);
          },[])
      
          



  //FETCH INITIAL DATA

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    serviceTypes:[],
    product_type:"SHOES",
    product_quantity:"25",
    form_location:"LISBON",
    email:""
  })

  const [nameError,setNameError] = useState(false);
  const [businessNameError,setBusinessNameError] = useState(false);
  const [emailError,setemailError] = useState(false);
  

  const [count, setCount] = useState(1)
  const isFinalPage = false;
  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })


  }

  const updateServices = (e) => {
    
    let name  = e.target.value;
    
    
    if(e.target.checked === true){
      form.serviceTypes.push({
        name:name
      })
    }

    if(e.target.checked === false){
     
   

      for(let i = 0; i < form.serviceTypes.length ;i++){
       
        
        if(e.target.value === form.serviceTypes[i].name){
          form.serviceTypes.splice(i, 1);
        }
      }
      
    }

    
  }

  function moveForward(){
 

    if(count === 1){
      


        if(form.name == ''){
          setNameError(true);
         
        }

        if(form.businessName == ''){
          setBusinessNameError(true);
         
        }

        if(form.email == ''){
          setemailError(true);
          
        }

        if(form.name != '' && form.businessName != '' && form.email != ''){
          setNameError(false);
          setBusinessNameError(false);
          setemailError(false);
          setCount(count + 1);
        }
        

          
    }

    if(count === 2){
      if(form.serviceTypes.length === 0){
        alert('Sure you dont want any service?')
      }

      else{
        setCount(count + 1);
      }
    }

    if(count === 3){
      

        setCount(count + 1);
      
    }
  }
  


function sendform(){

  
  
  let serviceTObject = [];

  for(let i = 0; i < form.serviceTypes.length; i++){

    console.log(form.serviceTypes[i]);

    serviceTObject.push({
      name:form.serviceTypes[i].name
    })
  }

  const dataSend = {
    "user":{
        "personName":form.name,
            "businessName":form.businessName,
            "email":form.email
    },

    "serviceType":serviceTObject,

    "productType":{
        "name":form.product_type,
    },

    "productQuantity":{
        "quantity":form.product_quantity
    },
    "location":{
        "name":form.form_location
    }

    

}
  
  const data = dataSend;

  authAxios.post(url+"createForm", data, headers).then((response) => {

    let formId = response.data.id;
    
  
  authAxios.get(url+"getResults?id="+formId, headers).then((response) => {
   ReactDOM.render(
      <React.StrictMode>
        <PricePage token={props.token} formId={formId} offer={response.data} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  
  }, (error) => {
    console.log(error);
    console.log(error.Authorization);
  });
  }, (error) => {
    console.log(error);
    console.log(error.Authorization);
  });

}




  return (

   

    <div className="App">
      
      <Typography style={{display:isFinalPage ? "none" : "inline"}} gutterBottom variant="h5" component="h1">
          Step {count} of 3
          </Typography>
      <form
        className="col-4 form"
        style={{display:isFinalPage ? "none" : "inline"}}
        target='_self'
      >
        {count === 1 ? (
          <Container className={classes.container} maxWidth="xs">
          
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                  <OutlinedInput
          className={classes.field}
           required
          placeholder={'Your Name'}
          className="form-control"
           name="name"
            type={ 'text' }
            value={form.name}
            onChange={updateForm}
            labelWidth={70}
            error={nameError}
          />
                  </Grid>
                  <Grid item xs={12}>
                  <OutlinedInput
         required
          placeholder={'Name of your business'}
          className="form-control"
           name="businessName"
            type={ 'text' }
            value={form.businessName}
            onChange={updateForm}
            labelWidth={70}
            error={businessNameError}
          />
                  </Grid>

                  <Grid item xs={12}>
                  <OutlinedInput
        required
          placeholder={'Your email'}
          className="form-control"
           name="email"
            type={ 'text' }
            value={form.email}
            onChange={updateForm}
            labelWidth={70}
            error={emailError}
          />
                  </Grid>

                </Grid>
              </Grid>
              
            </Grid>
        </Container>
        ) : null}
        {count === 2 ? (
           <Container maxWidth="md" component="main">
           <Grid container spacing={5} alignItems="flex-end">
             {serviceTypesArray.map((serviceType) => (
               // Enterprise card is full width at sm breakpoint
               <Grid item key={serviceType.id} xs={12} sm md={4}>
                 <Card>
                   <CardHeader
                     title={serviceType.name}
                   />
                   <CardContent>
                     <div className={classes.cardPricing}>
                     <Checkbox type="checkbox"   name="serviceTypes"
                          onChange={updateServices}
                          value={serviceType.name}/>
                     </div>
                     
                   </CardContent>
                   <CardActions>
                     <Button fullWidth  color="primary">
                       
                     </Button>
                   </CardActions>
                 </Card>
               </Grid>
             ))}
           </Grid>
         </Container>
        ) : null}
        {count === 3 ? (
          <div className="form-group">

<table align="center">

<tr>
    <th>
            <InputLabel>Select your product type</InputLabel>
            <Select color="secondary"  defaultInputValue={productTypesArray[0].name} name="product_type" id="product_type" onChange={updateForm} value={form.product_type}>
            {
              productTypesArray.map(productType => ( 
                <MenuItem key={productType.id} value={productType.name}>{productType.name}</MenuItem>))
              }
             
            </Select>
    </th>
    <th>
            <InputLabel>Select the number of products in your catalog</InputLabel>
            <Select color="secondary" defaultInputValue={productQuantityArray[0].name} name="product_quantity" id="product_quantity" onChange={updateForm} value={form.product_quantity}>
            {
              productQuantityArray.map(prodQuant => ( 
                <MenuItem color="secondary"  key={prodQuant.id} value={prodQuant.name}>{prodQuant.name}</MenuItem>))
              }
              
            </Select>
    </th>

    <th>
            <InputLabel>Select the nearest location to your business</InputLabel>
            <Select color="secondary"  defaultInputValue={"portooo"} name="form_location" id="form_location" onChange={updateForm} value={form.form_location}>
            
            {
              
              locationArray.map(location => ( 
                <MenuItem key={location.id} value={location.name}>{location.name}</MenuItem>))
              }
            </Select>

            </th>
            </tr>
            </table>
          </div>

        ) : null}

        



        
          </form>

          {count === 3 ? (
          <div className="form-group">
           <Button className="btn btn-dark"   variant="contained" color="secondary" onClick={sendform}>Submit Form</Button>
          </div>
        ):null}





        <table align="center">
  <tr>
    <th><Button  className="btn btn-dark" onClick={() => setCount(count - 1)} disabled={count < 2} variant="contained" color="secondary" style={{display:isFinalPage ? "none" : "inline"}}>
Back
</Button></th>
    <th><Button  className="btn btn-light"  onClick={moveForward} disabled={count > 2} variant="contained" color="secondary" style={{display:isFinalPage ? "none" : "inline"}}>
Next
</Button></th>
    
  </tr>
</table>
      
           
         



    </div>
  );
}

export default App;

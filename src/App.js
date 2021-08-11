import './App.css';
import React, { useState ,useEffect} from "react" 
import axios from 'axios';
import ReactDOM from 'react-dom';
import PricePage from './PricePage';


function App(props) {

  const [productTypesArray, setProductTypesArray] = useState([])
  const [locationArray,setLocationArray] = useState([])
  const [productQuantityArray,setProductQuantityArray] = useState([])
  const [serviceTypesArray,setServiceTypesArray] = useState([])
  const url = 'https://catalog-360-funnel-api.herokuapp.com/';
  const urlLocal = "http://localhost:8080/";

  

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
      
      <h1 style={{display:isFinalPage ? "none" : "inline"}}>Step {count} of 3</h1>
      
      <form
        className="col-4 form"
        style={{display:isFinalPage ? "none" : "inline"}}
        target='_self'
      >
        {count === 1 ? (
          <div className="form-group">
            <label>Your name</label>
            <input
              className="form-control"
              name="name"
              onChange={updateForm}
              value={form.name}
            />
            <label>Name of your business</label>
            <input
              className="form-control"
              name="businessName"
              onChange={updateForm}
              value={form.businessName}
            />
            
          <label>Your email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={updateForm}
            value={form.email}
          />
          
          </div>
        ) : null}
        {count === 2 ? (
          <div className="form-group">
            <label>Select the services you need to present your products in a 360 View</label>
            <label>To convert your catalog into 360 you have several  processes including <br></br> 360 photgraphy and software integrations to display and <br></br> allow your clients to interact with your product</label>
            <ul>
              {

              serviceTypesArray.map(serviceType => (

                
              
              <li ><input type="checkbox"   name="serviceTypes"
                          onChange={updateServices}
                          value={serviceType.name}/>
                <label for="cb1">{serviceType.name}</label>
              </li>

              ))
              }
            </ul>
          </div>
        ) : null}
        {count === 3 ? (
          <div className="form-group">
            <label>Select your product type</label>
            <select defaultInputValue={productTypesArray[0].name} name="product_type" id="product_type" onChange={updateForm} value={form.product_type}>
            {
              productTypesArray.map(productType => ( 
                <option key={productType.id} value={productType.name}>{productType.name}</option>))
              }
             
            </select>
            
            <label>Select the number of products in your catalog</label>
            <select defaultInputValue={productQuantityArray[0].name} name="product_quantity" id="product_quantity" onChange={updateForm} value={form.product_quantity}>
            {
              productQuantityArray.map(prodQuant => ( 
                <option key={prodQuant.id} value={prodQuant.name}>{prodQuant.name}</option>))
              }
              
            </select>

            <label>Select the nearest location to your business</label>
            <select defaultInputValue={"portooo"} name="form_location" id="form_location" onChange={updateForm} value={form.form_location}>
            
            {
              
              locationArray.map(location => ( 
                <option key={location.id} value={location.name}>{location.name}</option>))
              }
            </select>
          </div>

        ) : null}

        



        
          </form>

          {count === 3 ? (
          <div className="form-group">
           <button onClick={sendform}>Confirm</button>
          </div>
        ):null}

          <button
        className="btn btn-dark"
        type="submit"
        formTarget="_self"
        onClick={() => setCount(count - 1)}
        disabled={count < 2}
        style={{display:isFinalPage ? "none" : "inline"}}
      >
        Back
      </button>
      <button
        className="btn btn-light"
        type="submit"
        onClick={() => setCount(count + 1)}
        disabled={count > 2}
        style={{display:isFinalPage ? "none" : "inline"}}
        
      >
        Next
      </button>
    </div>
  );
}

export default App;

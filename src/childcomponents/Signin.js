import React, { useState }from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function Signin()
{
  const navigate=useNavigate();
  const [useremail,setUseremail]=useState();
  const [password,setPassword]=useState();
  function handleSignin()
  {
    axios.post('http://localhost:8000/checkUser', { "useremail":useremail,"password":password }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => {
            const { data,status } = response;
            
            if (data.success&& status===200) {
                alert("Logged in successfully!!! ")
              navigate('/home',{state:{useremail}}); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                  // Handle 401 Unauthorized error
                  alert('Unauthorized access. Please check your credentials.');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  alert('User account doesnt exists, create new account!!!');
                } else {
                  // Handle other errors
                  console.error('Error:', error);
                  alert('An error occurred while making the request.');
                }
              } else {
                // Handle network errors or other issues
                console.error('Error:', error);
                alert('An error occurred while making the request.');
              }
          });
  }
  
  return(
  
    <div className="signin-container">
      <h1 style={{textAlign:'center',backgroundColor:"whitesmoke"}}>
        SIGN IN
      </h1>
      <div className="signin-content">
      <div className="signin-body">
        <img src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_335657-936.jpg?w=360&t=st=1686193757~exp=1686194357~hmac=f3aa8a6016a4d695ea83cf66bc28de0ada1c36be036498c535e097a8c2e861d4"
        alt="signin"/>
      </div>
    <div className="signin-body">
        <div className="card">
          <div className="card-body">
           <input placeholder="Enter Registered Email" onChange={(e)=>{setUseremail(e.target.value)}}/>
           <input placeholder="Enter Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
           <button className="btn btn-primary" onClick={handleSignin}>SIGN IN</button>
          </div>
        </div>
    </div>
      </div>
    </div>
    
  )
}
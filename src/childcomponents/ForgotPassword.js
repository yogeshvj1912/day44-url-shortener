import React,{useState} from "react";
import {Form} from 'semantic-ui-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function ForgotPassword()
{
  const[email,sendOtp]=useState("");
  const navigate=useNavigate();
function handleReset()
{
  axios.post('https://url-shortener-lx4d.onrender.com/requestPasswordReset', { "useremail":email}, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
            
            if ( status===200) {
                alert("Random String sent to your respective email address ")
              navigate('/reset'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to send the random string.');
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
    <div className="forgot-container">
      <h1 style={{textAlign:'center',backgroundColor:"whitesmoke"}}>
        FORGOT PASSWORD
      </h1>
      <div className="forgot-content">
        <div className="forgot-body">
          <img src="https://img.freepik.com/premium-vector/forgot-password-account-login-web-page-protection-security-key-access-system-smartphone-computer-flat-vector-illustration_2175-1377.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
          alt="forgot password "
          id="forgotid"/>
        </div>
      <div className="forgot-body">
        <div className="card">
           <div className="card-body">
               <Form className="forgot">
                <Form.Field>
                    <input placeholder='Enter Email address' onChange={(e) => sendOtp(e.target.value)}/>
                 </Form.Field>
                <div className="btnDiv">
                    <button type="button" onClick={handleReset} className="btn btn-primary">Send OTP</button>   
               </div>
                </Form>
           </div>
        </div>
      </div>

      </div>
      
    </div>
  )
}
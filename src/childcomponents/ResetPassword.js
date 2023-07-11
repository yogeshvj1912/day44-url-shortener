import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Form} from 'semantic-ui-react'
import axios from 'axios';
export  default function Resetpassword()
{
    const [emailId,setEmailId]=useState("");
    const [token,setToken]=useState("");
    const [newPassword,setNewPassword]=useState("")
    const navigate = useNavigate();
    function updatePassword()
    {
       
        axios.post('https://url-shortener-lx4d.onrender.com/reset-password', {"useremail":emailId,"resetToken":token,"newPassword":newPassword }, { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            const { status } = response;
           
            if (status===200) {
                alert("Password Updated Successfully!!!")
              navigate('/signin'); // Navigate to the next component
            } 
            
          })
          .catch((error) => {
            if (error.response) {
                if (error.response.status === 500) {
                  // Handle 500 Unauthorized error
                  alert('Failed to update password');
                } else if (error.response.status === 404) {
                  // Handle 404 Not Found error
                  alert('Invalid email or token!!!');
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
        <div className="reset-container">
            
                <h1 style={{textAlign:'center'}}>PASSWORD RESET</h1>
            
            <div className="reset-content">
                <div className="reset-body" >
                        <img src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5598.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=ais"
                        alt="reset password"
                        id="resetid"/>
                </div>
                <div className="reset-body">
                <div  className="card ">
                <div className="card-body">
                <h6>Check Mails in Spam folder also!!!</h6>
                    <Form>
                        <Form.Field>
                        <input placeholder='Enter Email address'onChange={(e) => setEmailId(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                        <input placeholder='Enter Reset Token' onChange={(e) => setToken(e.target.value)}/>
                        </Form.Field>
                        <Form.Field>
                        <input placeholder='Enter New Password' type="password" onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Field>
                        <div className="btnDiv">
                          
                            <button className="btn btn-success" onClick={updatePassword}> RESET PASSWORD</button>
                                                    
                        </div>
                    </Form>
                </div>
            </div>
                </div>
            </div>
            
        </div>
    )
} 
import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
export default function Signup()
{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (username.trim() === '') {
      validationErrors.username = 'Username is required';
    }

    if (email.trim() === '') {
      validationErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (password.trim() === '') {
      validationErrors.password = 'Password is required';
    } else if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }
    

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can perform further actions here
      postData(email,password,username)
    } else {
      setErrors(validationErrors);
    }
    
  };
  function postData(email,password,username)
  {
    axios.post('http://localhost:8000/createUsers', {"username":username, "useremail":email,"password":password }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                const { data,status } = response;
               
                if (data.success&& status===200) {
                    alert(`${data.data.username} created account successfully!!!`)
                  navigate('/signin'); // Navigate to the next component
                } 
                
              })
              .catch((error) => {
                if (error.response) {
                    if (error.response.status === 409) {
                      // Handle 409 Unauthorized error
                      alert('User account already exists');
                    } else if (error.response.status === 500) {
                      // Handle 500 Not Found error
                      alert('Something went wrong internally!!!');
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
    <div className="signup-container">
       <h1 style={{textAlign:'center',backgroundColor:"whitesmoke"}}>
        SIGN UP PAGE
      </h1>
 <div className="signup-content">
 <div className="signup-body">
       <img src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?size=626&ext=jpg&ga=GA1.1.2047273959.1682233859&semt=sph"
       alt="signup illustration" id="signupid"/>
      </div>
      <div className="signup-body">
      <div className="card animation">
        <div className="card-body">
        <form onSubmit={handleSubmit} className="formclass">
      <div>
       <h3 className="signupheading">Signup Here!</h3>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
        />
        {errors.username && <div>{errors.username}</div>}
      </div>

      <div>
      
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email id"
        />
        {errors.email && <div>{errors.email}</div>}
      </div>

      <div>
      
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter Password"
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      
     <div > <button className="btn btn-primary" type="submit">Sign Up</button></div>
    </form>
        </div>
      </div>
      </div>
 </div>
    </div>
  )
}
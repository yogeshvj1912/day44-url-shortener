import React from 'react';
import './App.css';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './parentcomponents/Login';
import Home from './parentcomponents/Home';
import Signup from './childcomponents/Signup';
import Signin from './childcomponents/Signin';
import ForgotPassword from './childcomponents/ForgotPassword';
import Resetpassword from './childcomponents/ResetPassword';
function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/signin' element={<Signin/>}/>
          <Route exact path='/forgot' element={<ForgotPassword/>}/>
          <Route exact path='/reset' element={<Resetpassword/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

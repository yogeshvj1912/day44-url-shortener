import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
export default function Home()
{
  let shortUrl=''
  const location = useLocation();
  const useremail = location.state?.useremail;
  const [url,setUrl]=useState("")
  // const[short,setShort]=useState('')
  const [urlarray,setArray]=useState([])  
  const generateShortUrl = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://gotiny.cc/api', { input: url }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const code =  response.data[0].code;
      shortUrl="https://gotiny.cc/"+code
      console.log(shortUrl)
      // setShort(shortUrl);
        alert('Short Url generated successfully!!!')
      // Make a separate API call to store the data in MongoDB
      axios.post('http://localhost:8000/shortUrl', { "useremail":useremail,"shortenedUrl":shortUrl }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const { status } = response;
        
        if ( status===200) {
            alert("Short Url  saved successfully!!! ")
        } 
        
      })
      .catch((error) => {
        if (error.response) {
            if (error.response.status === 500) {
              // Handle 500
              alert('Error updating data .');
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
      
    } catch (error) {
      console.error('Error:', error);
    }
  };


  function displaygeneratedUrl()
  {
    
    axios.get(`http://localhost:8000/viewshortUrl/${useremail}`)
    .then((res )=>{
  
      setArray(res.data)
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 500) {
          // Handle 500
          alert('Error updating data .');
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
  // function saveUrl()
  // {
  //   console.log("wow")
  // }
  return(
   <div className="home-container">
        <div className="heading-container">
            <h1 style={{textAlign:'center'}}>URL SHORTNENER</h1>
        </div>
          <div className="courtesy">
            <h4>Thanks!!!</h4>
            <a href="https://gotiny.cc/"target="_blank" rel="noreferrer">
               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7gitUTCZOR_8Z-erHK717srVecnVBNddajg&usqp=CAU"
               width={70}
               height={45}               
               alt="gotiny website"/>
               </a>
               <h6>This page uses GoTiny to short the URL.We are not affiliated with GoTiny</h6>
          </div>
          <div className="home-body">
            <div className="profile">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZmYWlq0qa4xo2U99jaC1l7c9lqt8au6vGw&usqp=CAU"alt="user" className="user-icon"/>
             <h4 style={{textAlign:'center'}}>{useremail}</h4> </div>
            <div className='input-container'>
              <input type="text"  placeholder='Enter URL' onChange={(e) => setUrl(e.target.value)} />
            </div>
           
            <div className='btn-container'>
              <button className='btn btn-success' onClick={generateShortUrl}>Short URL</button>
              <button className='btn btn-primary' onClick={displaygeneratedUrl}>VIEW URL</button>
            </div>
           
           <div>
           <table>
        <thead>
          <tr>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
        {urlarray.map((url, index) => (

          <tr key={index}>
          <td>{index+1}.<a href={url}>{url}</a></td>
        </tr>
      ))} 
        </tbody>
      </table>
           </div>
          </div>
   </div>
  )
}
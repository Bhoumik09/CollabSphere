import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Leader from './Components/Leader'
import Nav from './Components/Nav'
import Land from './Components/Land'
import axios from 'axios'
import Register from './Components/Register'
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject);
          setUser(resObject);
        })
        .catch((err) => {

          console.log(err.message);
        });
    };
    getUser();
  }, []);
  console.log(user)
  return (
    <div>
      
      <Routes>
        <Route path='/' element={user==null?<Land user={user}/>:user.profileExists?<Land user={user.user}/>:<Navigate to="/register"/>}/>
        <Route path='/leader' element={user==null?<Navigate to='/'/>:<Leader user={user.user}/>}/>
        <Route path='/register' element={user==null?<Navigate to='/'/>:<Register user={user.user} setUser={setUser}/>}/>
      </Routes>
      
    </div>
  )
}

export default App

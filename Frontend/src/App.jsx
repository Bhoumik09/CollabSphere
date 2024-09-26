import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Leader from './Components/Leader'
import Nav from './Components/Nav'
import Land from './Components/Land'
import axios from 'axios'
import Register from './Components/Register'
import Home from './Components/Home'
import Lists from './Components/Lists'
import Profile from './Components/Profile'
import ProjectMain from './Components/ProjectMain'
import CreateProject from './Components/CreateProject'
import SeeMore from './Components/SeeMore'
import JoinedComm from './Components/JoinedComm'
import ParticipantsComm from './Components/ParticipantsComm'
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
          
          setUser(prevUser => {
            // Only update if user value has changed
            if (JSON.stringify(prevUser) !== JSON.stringify(resObject)) {
              return resObject;
            } else {
              return prevUser;
            }
          });
        })
        .catch((err) => {

          console.log(err.message);
        });
    };
    getUser();
  }, [user]);
  console.log(user);
  return (
    <div>
       <Routes>
        {/* Render Sidebar for /app/* routes */}
        
          <Route path='/' element={user == null ? <Land user={user} /> : user.profileExists ? <Land user={user.user} /> : <Navigate to="/register" />} />
        <Route path='/register' element={user == null ? <Navigate to='/' /> : <Register user={user.user} setUser={setUser} />} />
        {/* Render Home component with appropriate content */}
        <Route path='/app' element={ <Home user={user} />}>
          <Route path='home' element={user == null ? <Navigate to='/' /> :<Lists user={user} /> } />
          <Route path='leader' element={user == null ? <Navigate to='/' /> :<Leader user={user} />} />
          <Route path='communities/joined' element={user == null ? <Navigate to='/' /> :<JoinedComm user={user}/>} />
          <Route path='communities/joined/:id/members' element={user == null ? <Navigate to='/' /> :<ParticipantsComm user={user}/>} />
          {/* <Route path='profile' element={<Profile user={user} />} /> */}
          <Route path='profile/:id' element={<Profile user={user} />} />
          <Route path='project' element={user == null ? <Navigate to='/' /> :<ProjectMain user={user} />} />
          <Route path='project/new' element={user == null ? <Navigate to='/' /> :<CreateProject user={user}/>} />
          <Route path='project/all' element={user == null ? <Navigate to='/' /> :<ProjectMain user={user}/>} />
          <Route path='project/:id' element={user == null ? <Navigate to='/' /> :<SeeMore user={user}/>} />
          <Route path='project/:id/team' element={user == null ? <Navigate to='/' /> :<SeeMore user={user}/>} />
        </Route>
      </Routes>
      
    </div>
  )
}

export default App

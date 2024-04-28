import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


function CommList({id,name,desc,user,contains}) {
    let userId=user?.id;
    let location=useLocation();
    let navigate=useNavigate();
    let arr=location.pathname.split('/');
    let last=arr[arr.length-1];
    let [commPresent,setCommPresent]=useState(contains);
    let seeMore=async()=>{
        navigate(`${id}/members`);
    }
    let join=async()=>{
        setCommPresent(true);
        await axios.post(`http://localhost:8000/community/join/${id}`,{userId});
        
    }
    let leave=async()=>{
      setCommPresent(false);
      await axios.post(`http://localhost:8000/community/leave/${id}`,{userId});
  }
  return (
    <div>
      <div className="card-special" id={id}>
            <div className="card-details">
              <p className="text-title">{name}</p>
              <p className="text-body">
                {desc}
              </p>
            </div>
            {last==='joined'?<button className="card-button" onClick={seeMore}>SeeMore</button>:commPresent?(<button className="card-button" style={{backgroundColor:'red'}}  onClick={leave}>Leave</button>):<button className="card-button" onClick={join}>Join</button>}
            
          </div>
    </div>
  )
}

export default CommList

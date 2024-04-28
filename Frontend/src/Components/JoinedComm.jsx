import axios from "axios";
import React, { useEffect, useState } from "react";
import CommList from "./CommList";
import '../assets/css/Home.css'
function JoinedComm({ user }) {
  let id = user?.id;
  let [joinedCommunity, setJoinedCommunity] = useState([]);
  let getJoinedComm = async () => {
    let response = await axios.get("http://localhost:8000/community/joined", {
      params: { id },
    });
    setJoinedCommunity(response.data);
  };
  useEffect(() => {
    getJoinedComm();
  },[]);
  return (
    <div>
      <div className="home-div">
        <div id="search">
          <i className="bx bx-search-alt" id="home-search"></i>
          <input
            className="search-box"
            type="search"
            placeholder="Search Community"
          />
        </div>
        

        <div id="community-head">Joined Communities</div>

        <div className="communities">
          {joinedCommunity?.map((community)=>(
            <CommList  key={community._id} id={community._id}name={community.name} desc={community.description} user={user}/>
          ))}
            
          </div>
        </div>
      </div>
  );
}

export default JoinedComm;

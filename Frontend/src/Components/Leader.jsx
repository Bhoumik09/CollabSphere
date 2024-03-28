import React, { useEffect, useState } from "react";
import axios from 'axios'
import LeaderComp from "./LeaderComp";
import '../assets/css/Profile.css'
function Leader({ props }) {
  const [leader, setLeader] = useState([]);

  useEffect(() => {
    async function getLeaderBoard() {
      try {
        const response = await axios.get('http://localhost:8000/leader');
        setLeader(response.data); // Assuming the response.data is an array
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        // Handle error, maybe set an error state or show a message to the user
      }
    }
    getLeaderBoard();
  }, []); // Empty dependency array to run this effect only once on mount

  return (
    <div className="content">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <div id="heading">
        <h1>LeaderBoard</h1>
        <p>
          This leaderboard is based on the number of contributions a person has done
        </p>
        <br />
      </div>
        <div className="box-list">
          {leader.map((item, index) => (
            
            <LeaderComp key={index}  index={index+1}data={item} />
          ))}
        </div>
      
    </div>
  );
}

export default Leader;

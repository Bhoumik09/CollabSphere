import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/SeeMore.css";
import Members from "./Members";
import { Link, useLocation, useParams } from "react-router-dom";
function SeeMore() {
  let { id } = useParams();
  let location = useLocation();
  let arr = location.pathname.split("/");
  let last = arr[arr.length - 1];
  let [requestArr, SetRequestArr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/project/${id}?last=${last}`
        );
        SetRequestArr(response.data.reqArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div>
      <div class="dashboard">
        <header>Projects / My projects</header>

        <div class="request_box">
          <Link to={`/app/project/${id}`} className="request-button">Join Requests</Link>
          <p>
            <Link to={`/app/project/${id}/team`} className="member-button" >
              <i class="bx bx-group"></i> View Team Members
            </Link>
          </p>

          <div class="request_list">
            <ul>
              {requestArr.length > 0 ? (
                requestArr.map((userId) => (
                  <Members key={userId} userId={userId} PId={id} />
                ))
              ) : last === "team" ? (
                <p>
                  <center>No Team Members Found</center>
                </p>
              ) : (
                <p>
                  <center>No Requests Members Found</center>
                </p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeMore;

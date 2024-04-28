import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import profileImg from '../assets/images/collabsphere-logo-dark.jpg';

function Members({ userId, PId }) {
  const [showMember, setShowMember] = useState(true);
  const location = useLocation();
  const arr = location.pathname.split("/");
  const last = arr[arr.length - 1];
  

  const accept = async () => {
    try {
      await axios.post(`http://localhost:8000/project/${PId}/accept`, { userId });
      setShowMember(false);
    } catch (error) {
      console.error("Error accepting member:", error);
    }
  };

  const reject = async () => {
    try {
      await axios.post(`http://localhost:8000/project/${PId}/reject`, { userId });
      setShowMember(false);
    } catch (error) {
      console.error("Error rejecting member:", error);
    }
  };

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const changeLocation = (id) => {
    navigate(`/app/profile/${id}`);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${userId}`);
        setUserInfo(response.data.user);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    getUser();
  }, [userId]);

  useEffect(() => {
    // Reset showMember state when the URL changes to /team
    if (last === "team") {
      setShowMember(true);
    }
  }, [location.pathname, last]);

  if (!showMember) {
    return null;
  }

  return (
    <div>
      <li className="users">
        <div className="user-img">
          <img src={profileImg} alt="user-pfp" />
        </div>
        <div className="info">
          <p>Name: {userInfo?.name}</p>
          {/* Add any additional user information you want to display */}
        </div>
        <div className="profile-btn">
          <button onClick={() => changeLocation(userInfo?._id)}>
            View Profile
          </button>
        </div>
        {last === "team" ? (
          <div className="github-btn">
            <button>
              <i className="bx bxl-github">
                <a href={userInfo?.github} target="_blank" rel="noopener noreferrer"></a>
              </i>
            </button>
          </div>
        ) : (
          <div className="accept">
            <button onClick={accept}>
              <i className="bx bx-check"></i>
            </button>
          </div>
        )}
        {last === "team" ? (
          <div className="linkedin-btn">
            <button>
              <i className="bx bxl-linkedin">
                <a href={userInfo?.linkedin} target="_blank" rel="noopener noreferrer"></a>
              </i>
            </button>
          </div>
        ) : (
          <div className="reject">
            <button onClick={reject}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
      </li>
    </div>
  );
}

export default Members;
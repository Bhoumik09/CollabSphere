import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import profileImg from "../assets/images/collabsphere-logo-dark.jpg";
import "../assets/css/projectMain.css";

function ParticipantsComm({ user }) {
  let { id } = useParams();
  const [participantsList, setParticipantsList] = useState([]);
  let navigate = useNavigate();
  let changeLocation = (user) => {
    navigate(`/app/profile/${user}`);
  };
  let getPartList = async () => {
    let response = await axios.get(
      `http://localhost:8000/community/joined/${id}/members`
    );

    setParticipantsList(response?.data?.members);
  };

  useEffect(() => {
    getPartList();
  }, []);
  return (
    <div>
      <div class="dashboard">
        <header>Projects / My projects</header>

        <div class="request_box">
          <header>
            <center>
              <strong>Participants</strong>
            </center>
          </header>

          <div class="request_list">
            <ul>
              {participantsList
                ?.filter(
                  (member) =>
                    JSON.stringify(member._id) !== JSON.stringify(user?.id)
                )
                .map((member) => (
                  <li className="users">
                    <div className="user-img">
                      <img alt="user-pfp" src={profileImg} />
                    </div>
                    <div className="info">
                      <p>Name:{member?.name} </p>
                      {/* Add any additional user information you want to display */}
                    </div>
                    <div className="profile-btn">
                      <button onClick={() => changeLocation(member?._id)}>
                        View Profile
                      </button>
                    </div>
                    <div className="github-btn">
                      <button>
                        <i className="bx bxl-github">
                          <a
                            href={member?.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          ></a>
                        </i>
                      </button>
                    </div>
                    <div className="linkedin-btn">
                      <button>
                        <i className="bx bxl-linkedin">
                          <a
                            href={member?.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          ></a>
                        </i>
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsComm;

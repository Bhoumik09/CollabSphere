import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ProjectsList({ desc, id, name, git, user, author }) {
  let location = useLocation()?.pathname;
  let present = location.split("/")[3];
  let userId = user?.id;
  let navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);
  const [isContributionPending, setIsContributionPending] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  let changePath = (id) => {
    navigate(`/app/project/${id}`);
  };

  useEffect(() => {
    const checkPendingStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/project/request/${id}`, {
          params: { userId },
        });
        setIsPending(response.data.isPending);
        setIsBlocked(response.data.isBlocked);
        setIsAccepted(response.data.isAccepted);
      } catch (error) {
        console.error("Error checking pending status:", error);
      }
    };
    checkPendingStatus();
  }, [id, userId]);

  let contribute = async () => {
    setIsContributionPending(true);
    try {
      await axios.post(`http://localhost:8000/project/request/${id}`, { userId });
    } catch (error) {
      console.error("Error submitting contribution request:", error);
      setIsContributionPending(false);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="project-title">
          <h4>Project Title: {name}</h4>
        </div>
        <div className="description">
          <p>{desc}</p>
        </div>
        <div className="links">
          <div
            style={{
              border: "1px solid black",
              backgroundColor: "#0950a8",
              borderRadius: "20px",
              padding: "2px 32px",
              fontWeight: "500",
              color: "white",
            }}
            className="github_link"
          >
            <a href={git} style={{ color: "white" }}>
              Github
            </a>
          </div>
          <div className="more-btn">
            { JSON.stringify(user?.id) === JSON.stringify(author) ? (
              <button onClick={() => {
                changePath(id);
              }}>
                See more
              </button>
            ) : isBlocked ? (
              <button style={{ backgroundColor: "red" }}>Rejected</button>
            ) : isAccepted ? (
              <button style={{ backgroundColor: "green" }}>Enrolled</button>
            ) : isPending || isContributionPending ? (
              <button style={{ backgroundColor: "red" }}>Pending</button>
            ) : (
              <button onClick={contribute}>Contribute</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectsList;
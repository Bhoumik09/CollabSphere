import React, { useEffect, useState } from "react";
import "../assets/css/projectMain.css";
import { index } from "../assets/js/index.js";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectsList from "./ProjectsList.jsx";
function ProjectMain({ user }) {
  index();
  let navigate = useNavigate();
  let changePage = (link) => {
    navigate(`/app/project${link}`);
  };
  let create = () => {
    navigate("/app/project/new");
  };
  let [projectArr, SetProject] = useState(null);
  let [showProjects, setShowProjects] = useState(false);
  let location = useLocation()?.pathname;
  let arr = location.split("/");
  let present = arr[arr.length - 1];
  
  useEffect(() => {
    let getProjects = async () => {
      let id = user?.id;
      setTimeout(async () => {
        let response;
        if (present === "project") {
          response = await axios.get("http://localhost:8000/project", {
            params: { userId: id },
          });
        } else {
          response = await axios.get("http://localhost:8000/project/all");
        }
        SetProject(response.data);
        setShowProjects(true);
      }, 1000);
    };
    getProjects();
  }, [present]);

  return (
    <div>
      <section className="projects-section">
        <header className="page-title">Projects</header>
        <div className="tabs">
          <div className="tab_btn ">
            <button
              className="tab_btns active"
              onClick={() => {
                changePage("");
              }}
            >
              Your Projects
            </button>
            <button
              className="tab_btns"
              onClick={() => {
                changePage("/all");
              }}
            >
              Explore
            </button>
          </div>
          <hr className="hr-1" />
          <div className="line"></div>
        </div>
        <div className="contentP">
          {showProjects ? (
            projectArr.length > 0 ? (
              projectArr.map((project) =>
                present === "" &&
                JSON.stringify(project.author) !==
                  JSON.stringify(user.id) ? null : (
                  <ProjectsList
                    desc={project.desc}
                    id={project?._id}
                    key={project?._id}
                    name={project?.name}
                    git={project?.github}
                    user={user}
                    author={project?.author}
                  />
                )
              )
            ) : (
              <div className="no-projects">No projects found</div>
            )
          ) : null}
        </div>
      </section>
      {present === "project" ? (
        <button
          className="create_btn"
          title="Create a project"
          onClick={create}
        >
          +
        </button>
      ) : null}
    </div>
  );
}

export default ProjectMain;

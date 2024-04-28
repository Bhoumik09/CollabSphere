import React, { useEffect, useState } from 'react';
import profileImg from '../assets/images/collabsphere-logo-dark.jpg';
import '../assets/css/Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProjectCard from './ProjectCard';

function Profile({ user }) {
  
  
  const styles = { margin: 0, padding: 0, boxSizing: 'border-box' };
  const [userInfo, SetUserInfo] = useState(null);
  const [skill, setSkill] = useState(null);
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/${id}`);
        SetUserInfo(response);

        // Fetch projects for the user
        const projectsResponse = await axios.get(`http://localhost:8000/project?userId=${id}`);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching profile or projects:', error);
      }
    };
    getProfile();
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      const skillArr = userInfo.data.user.skills.map(index => index.name.toUpperCase());
      setSkill(skillArr);
    }
  }, [userInfo]);

  return (
    <section className="profile-area">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
      <header className="profile-header">Profile</header>
      <div className="design-box"></div>

      <div className="profile-content">
        <div className="name-img">
          <img src={profileImg} alt="user-image" />
          <div className="name-rank">
            <p className="name">{userInfo?.data?.user?.name}</p>
            <div className="rank">
              <p>Rank :{userInfo?.data?.rank} </p>
              <p></p>
            </div>
          </div>
        </div>

        <div className="profile-information">
          <div className="info"><p>Name: </p> <p className="user-info">{userInfo?.data?.user?.name}</p></div>
          <div className="info"><p>Email : </p> <p className="user-info">{userInfo?.data?.user?.email} </p></div>
          <div className="info"><p>Github :</p> <p className="user-info"> <a href={userInfo?.data?.user?.github} style={{ textDecoration: 'none', color: 'white' }} target='_blank' rel="noreferrer">See Github</a></p></div>
          <div className="info"><p>Linkedin: </p> <p className="user-info"> <a href={userInfo?.data?.user?.linkedin} style={{ textDecoration: 'none', color: 'white' }} target='_blank' rel="noreferrer">See Linkedin</a></p></div>
        </div>

        <hr className="hr1" />

        <div className="skills">
          <header>Skills</header>
          {skill && skill.map((index) => (
            <p className="skill-item" key={index}> <i className='bx bx-chevron-right'></i>{index} </p>
          ))}
        </div>
        <div className="projects-display">
        <header >Top Projects</header>
        {projects.map(project => (
          <ProjectCard
            key={project._id}
            title={project.name}
            field={project.field}
            link={project.github}
          />
        ))}
      </div>
        

        
      </div>
    </section>
  );
}

export default Profile;
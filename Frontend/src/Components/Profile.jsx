import React, { useEffect, useState } from 'react';
import profileImg from '../assets/images/collabsphere-logo-dark.jpg';
import '../assets/css/Profile.css';
import  axios from 'axios'
function Profile({user}) {
  const styles = {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  };
  let [userInfo,SetUserInfo]=useState(null);
  let [skill,setSkill]=useState(null);
  useEffect(()=>{
    let getProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/${user.id}`);
            SetUserInfo(prevUser => {
              // Only update if user value has changed
              if (JSON.stringify(prevUser) !== JSON.stringify(response)) {
                return response;
              } else {
                return prevUser;
              }
            });
            console.log(response) // Log the response data for debugging
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }
    getProfile();
       
  },[userInfo])
  console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      const skillArr = userInfo.data.user.skills.map(index => index.name.toUpperCase());
      setSkill(skillArr);
    }
  }, [userInfo]);
  console.log(skill)
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
          <img src={profileImg} alt="user-image"/>
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
          <div class="info"><p>Github :</p> <p class="user-info"> <a href={userInfo?.data?.user?.github} style={{textDecoration:'none',color:'white'}} target='_blank'>See Github</a></p></div>
          <div class="info"><p>Linkedin: </p> <p class="user-info"> <a href={userInfo?.data?.user?.linkedin} style={{textDecoration:'none',color:'white'}} target='_blank'>See Linkedin</a></p></div>
        </div>
        
        <hr className="hr1"/>
        
        <div className="skills">
          <header>Skills</header>
          {skill && skill.map((index)=>(
            <p className="skill-item"> <i className='bx bx-chevron-right' ></i>{index} </p>
          ))}
           

        </div>

        <div className="separator"></div>

        <div className="projects-display">
          <header>Top Projects</header>
        </div>

        <div className="project-card-1">
          <header>Web Development</header>
          <p>A community engagement application</p>
          <a href="#">View Project <i className='bx bx-right-arrow-alt' ></i></a>
        </div>
        <div className="project-card-2">
          <header>Android Development</header>
          <p>An inventory management app</p>
          <a href="#">View Project <i className='bx bx-right-arrow-alt' ></i></a>
        </div>
        <div className="project-card-3">
          <header>Machine Learning</header>
          <p>Crop disease prediction</p>
          <a href="#">View Project <i className='bx bx-right-arrow-alt' ></i></a>
        </div>
      </div>
    </section>
  );
}

export default Profile;

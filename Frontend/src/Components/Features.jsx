import React, { Fragment, useRef } from "react";
import axios from "axios";
import heroBlack from "../assets/images/hero-back.webp";
import community from "../assets/images/join-community.png";
import projects from "../assets/images/projects.svg";
import leader from "../assets/images/leaderboard.svg";
import handshake from "../assets/images/handshake.jpg";
import code from "../assets/images/code.svg";
import award from "../assets/images/award.svg";
import polyTriangle from "../assets/images/Polygon_1_triangle.svg";
import rect1 from "../assets/images/Rectangle-1.svg";
import rect2 from "../assets/images/Rectangle-2.svg";
import polyTriangle2 from "../assets/images/Polygon_2_triangle.svg";
import darklogo from "../assets/images/collabsphere-logo-dark-1.svg";
import meta from "../assets/images/meta.svg";
import x from "../assets/images/x.svg";
import youtube from "../assets/images/youtube.svg";
import instagram from "../assets/images/instagram.svg";
import linkedin from "../assets/images/linkedin.svg";

import { useNavigate } from "react-router-dom";

function Features({user}) {
  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  let navigate = useNavigate();
  function join() {
    if(user!==null)
    navigate("/app/home");
  }
  const feedback = async (event) => {
    event.preventDefault();

    // Accessing input values using refs
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const message = messageRef.current.value;
    await axios.post("http://localhost:8000/feedback", {
      name,
      email,
      message,
    });
    event.target.reset();
  };

  return (
    <div style={{ backgroundColor: "#0D1117" }}>
      <div className="container">
        <div className="text-container">
          <h1 className="hero-label">
            Connect, Collaborate, and Learn with CollabSphere
          </h1>
          <p className="hero-desc">
            Join our vibrant community and unlock endless possibilities...
          </p>
          <button className="hero-button" onClick={join} >
            Join Community <i className="arrow right"></i>
          </button>
          
        </div>
        <div className="image-container">
          <img src={heroBlack} alt="hero-image" className="hero-image" />
        </div>
      </div>

      <div className="features" id="features">
        <div className="feature">
          <img
            className="feature-1-image"
            src={community}
            alt="Join community"
          />
          <div className="group">
            <div className="ball-green"></div>
            <div className="line-green"></div>
          </div>

          <div className="feature-1-content">
            <h1 className="feature-1-label">
              Join a Thriving Tech<br></br> Community...
            </h1>
            <p className="feature-1-desc">
              Discover a vibrant space where tech enthusiasts come together to
              share knowledge, learn from experts, and engage in meaningful
              discussions.
            </p>
          </div>
        </div>
        <div className="feature">
          {/* <div className="ball-green"></div> */}

          <div className="feature-1-content">
            <h1 className="feature-1-label">
              Collaborate on Exciting Projects...
            </h1>
            <p className="feature-1-desc">
              Get involved in collaborative projects, create or join a team.
              Interact, work and learn along with your team members and enhance
              your skillset.
            </p>
          </div>
          <div className="group">
            <div className="ball-pink"></div>
            <div className="line-pink"></div>
          </div>
          <img
            className="feature-1-image"
            src={projects}
            alt="Join community"
          />
        </div>
        
        <div className="feature">
          {/* <div className="ball-cyan"></div> */}

          <img className="feature-1-image" src={leader} alt="Join community" />
          <div className="group">
            <div className="ball-cyan"></div>
            <div className="line-cyan"></div>
          </div>
          <div className="feature-1-content">
            <h1 className="feature-1-label">
              Earn points and climb the leaderboard by completing projects...
            </h1>
            <p className="feature-1-desc">
              Get recognized for your contributions and<br></br> achievements
              and establish yourself in your<br></br> domain.
            </p>
          </div>
        </div>
      </div>
      <div className="collab-feature">
        <h1 className="collab-feature-heading">
          Collaboration Experience like never before...
        </h1>

        <div className="feature-cards">
          <div className="join-project">
            <img
              className="join-project-img"
              src={handshake}
              alt="Join Project"
            />
            <p className="join-project-desc">
              Create a project or join an <br /> existing project.
            </p>
          </div>

          <div className="assign-task">
            <img className="assign-task-img" src={code} alt="Assign Task" />
            <p className="assign-task-desc">
              Assign Task and Check Status <br /> of the task.
            </p>
          </div>

          <div className="reward">
            <img className="reward-img" src={award} alt="Reward" />
            <p className="reward-desc">
              Get rewarded on <br /> completion of the task.
            </p>
          </div>
        </div>
      </div>
      <img className="polygon-1" src={polyTriangle} alt="shape" />

      <div className="contact" id="contacts">
        <h1 className="contact-heading">Connect With Us</h1>

        <div className="contact-container">
          <div className="contact-desc">
            <p className="contact-content">Have a question?</p>
            <p className="contact-content">Want to join our community?</p>
            <p className="contact-content">Reach out to us !</p>
          </div>

          <div>
            <form onSubmit={feedback} className="contact-form">
              <input type="text" id="name" ref={nameRef} placeholder="Name" />
              <input
                type="text"
                id="email"
                ref={emailRef}
                placeholder="Email"
              />
              <input
                type="text"
                id="message"
                ref={messageRef}
                placeholder="Message"
              />
              <input type="submit" className="submit-btn" />
            </form>
          </div>
        </div>
      </div>

      <img className="rectangle-1" src={rect1} alt="shape" />

      <hr></hr>

      <div className="footer">
        
        <div className="social">
          <div className="social-head">
            <p>Follow Us</p>
          </div>

          <div className="social-icons">
            <img src={instagram} alt="instagram" />
            <img src={meta} alt="meta" />
            <img src={youtube} alt="youtube" />
            <img src={linkedin} alt="linkedin" />
            <img src={x} alt="twitter" />
          </div>
        </div>
        <div className="footer-logo">
          <img src={darklogo} alt="logo" />
        </div>

      </div>

      <hr className="footer-hr" />
      <p className="trademark">© 2024 CollabSphere. All rights reserved.</p>
    </div>
  );
}

export default Features;

import React, { useEffect, useMemo, useState } from "react";
import Leader from "./Leader";
import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import "../assets/css/Profile.css";
import Tyr from "./Tyr";
import "../assets/css/Home.css";
import android from "../assets/images/android-dev-banner.jpg";
import banner1 from "../assets/images/banner1.png";
import machine from "../assets/images/machine-learning-banner2.jpg";
import uibanner from "../assets/images/ui-banner2.jpg";
import web from "../assets/images/website-development-banner.avif";
function Home({user}) {
  let location = useLocation();

  let [currentlocation, SetLocation] = useState(location.pathname);
  console.log(currentlocation);
  useEffect(() => {
    SetLocation(location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ display: "flex", width: "100vw", height:"10vh" }}>
      <nav className="sidebar">
        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `}</style>
        <header>
          <div className="appname">
            <span className="header-text">CollabSphere</span>
          </div>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="navlink">
              <div className="search-bar">
                <input
                  className="search-box"
                  type="search"
                  placeholder="Search..."
                />
                <i className="bx bx-search-alt"></i>
              </div>
            </li>

            <ul className="menu-links">
              <li className="navlink">
                <div className="btns">
                  <Link to="/home" className="text nav-text">
                    <i className="bx bx-home-alt"></i>
                    <span>Home</span>
                  </Link>
                </div>
              </li>
              <li className="navlink">
                <div className="btns">
                  <Link to="/profile" className="text nav-text">
                    <i className="bx bx-user"></i>
                    <span>Profile</span>
                  </Link>
                </div>
              </li>
              <li className="navlin">
                <div className="btns">
                  <Link to="#" className="text nav-text">
                    <i className="bx bx-message-dots"></i>
                    <span>Community</span>
                  </Link>
                </div>
              </li>
              <li className="navlink">
                <div className="btns">
                  <Link to="/leader" className="text nav-text">
                    <i className="bx bxs-graduation"></i>
                    <span>Leaderboard</span>
                  </Link>
                </div>
              </li>
              <li className="navlink">
                <div className="btns">
                  <a href="#">
                    <i className="bx bx-book"></i>
                    <span className="text nav-text">Projects</span>
                  </a>
                </div>
              </li>
              <li className="navlink">
                <div className="btns">
                  <a href="#">
                    <i className="bx bx-cog"></i>
                    <span className="text nav-text">Settings</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {currentlocation === "/home" && (
        <div className="home-div">
          <div id='search'>
            <i className="bx bx-search-alt" id="home-search"></i>
            <input
              className="search-box"
              type="search"
              placeholder="Search Community"
            />
          </div>
          <div className="hero-div">
            <img className="hero-img" src={banner1} />
          </div>

          <div id="community-head">Featured Communities</div>

          <div className="communities">
            
              <a to="#">
                <img src={web} alt="web-dev" />
              </a>
            
            
              <a href="#">
                <img src={machine} alt="machine-learing" />
              </a>
            
            
              <a href="#">
                <img src={uibanner} alt="machine-learing" />
              </a>
            
            
              <a href="#">
                <img src={android} alt="machine-learing" />
              </a>
            
          </div>
        </div>
      )}
      {currentlocation === "/leader" && <Leader />}
      {currentlocation === "/profile" && <Profile user={user}/>}
    </div>
  );
}

export default Home;

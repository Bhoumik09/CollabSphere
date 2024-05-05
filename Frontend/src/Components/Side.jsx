import React from 'react'
import "../assets/css/Home.css";
import { Link } from 'react-router-dom';
import { logout } from './Nav';
import '../assets/js/home'
function Side({user}) {
  return (
    <div>
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
            <span className="header-text" >CollabSphere</span>
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
            <Link to="/app/home" className="text nav-text" style={{color:"white"}}>
              <li className="navlink">
                <div className="btns">
                    <i className="bx bx-home-alt"></i>
                    <span>Home</span>
                 
                </div>
              </li>
              </Link>
              {user?
              (
              <li className="navlink">
                <div className="btns">
                  <Link to={`/app/profile/${user}`} className="text nav-text">
                    <i className="bx bx-user"></i>
                    <span>Profile</span>
                  </Link>
                </div>
              </li>):null}
              <li className="navlin">
                <div className="btns">
                  <Link to="/app/communities/joined" className="text nav-text">
                    <i className="bx bx-message-dots"></i>
                    <span>Community</span>
                  </Link>
                </div>
              </li>
              <Link to="/app/leader" className="text nav-text" style={{color:"white"}}>
              <li className="navlink">
                <div className="btns">
                    <i className="bx bxs-graduation"></i>
                    <span className="text nav-text" >Leaderboard</span>
                  
                </div>
              </li>
              </Link>
              <Link to="/app/project" style={{color:"white"}}>
              <li className="navlink">
                <div className="btns">
                  
                    <i className="bx bx-book"></i>
                    <span className="text nav-text">Projects</span>
                  
                </div>
              </li>
              </Link>
              {user?<li className="navlink" >
                <div className="btns">
                  <Link to="/app/project">
                    <i className="bx bx-book"></i>
                    <span className="text nav-text" onClick={logout}>Logout</span>
                  </Link>
                </div>
              </li>:null}
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Side;

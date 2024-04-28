import React, { useEffect, useRef, useState } from "react";
import android from "../assets/images/android-dev-banner.jpg";
import banner1 from "../assets/images/banner1.png";
import machine from "../assets/images/machine-learning-banner2.jpg";
import uibanner from "../assets/images/ui-banner2.jpg";
import web from "../assets/images/website-development-banner.avif";
import axios from "axios";
import CommList from "./CommList";
import profileImg from "../assets/images/collabsphere-logo-dark.jpg";
import { useNavigate } from "react-router-dom";

function Lists({ user }) {
  const [communitiesArr, setCommunity] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const searchRef = useRef();
  
  let navigate=useNavigate();
  let changeLocation=(id)=>{
        navigate(`/app/profile/${id}`)
  }
  const getSearch = async (e) => {
    e.preventDefault();
    const search = searchRef.current.value;
    try {
      const response = await axios.get("http://localhost:8000/find/user", {
        params: { search },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const response = await axios.get("http://localhost:8000/community/all");
        setCommunity(response.data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };
    getCommunity();
  }, []);

  return (
    <div>
      <div className="home-div">
        <center><form className="searchBox" onSubmit={getSearch}>
          <input
            className="searchInput"
            type="text"
            ref={searchRef}
            placeholder="Search hashcode/registration Number"
          />
          <button className="searchButton" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
  <g clip-path="url(#clip0_2_17)">
    <g filter="url(#filter0_d_2_17)">
      <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
    </g>
  </g>
  <defs>
    <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
      <feOffset dy="4"></feOffset>
      <feGaussianBlur stdDeviation="2"></feGaussianBlur>
      <feComposite in2="hardAlpha" operator="out"></feComposite>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
    </filter>
    <clipPath id="clip0_2_17">
      <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
    </clipPath>
  </defs>
</svg>
          </button>
        </form></center>
        {searchResults ? (
          searchResults.map((member) => (
            <div className="search-results">
              <div className="request_list">
                <ul>
                  <li className="users">
                    <div className="user-img">
                      <img alt="user-pfp" src={profileImg} />
                    </div>
                    <div className="info">
                      <p>Name:{member?.name} </p>
                      {/* Add any additional user information you want to display */}
                    </div>
                    <div className="profile-btn">
                      <button onClick={()=>changeLocation(member._id)}>View Profile</button>
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
                </ul>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="hero-div">
              <img className="hero-img" src={banner1} alt="Hero Banner" />
            </div>
            <div id="community-head">Featured Communities</div>
            <div className="communities">
              {communitiesArr.map((community) => (
                <CommList
                  key={community._id}
                  id={community._id}
                  name={community.name}
                  desc={community.description}
                  user={user}
                  contains={community?.members?.includes(user?.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Lists;
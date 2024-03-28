import React from 'react'

function Tyr() {
  return (
    
      <div className="home-div">
        <i className='bx bx-search-alt' id="home-search"></i>
        <input className="search-box" type="search" placeholder="Search Community"/>

        <div className="hero-div">
            <img className="hero-img" src="banner1.png" alt="banner"/>
        </div>

        <header>Featured Communties</header>

        <div className="communities">
            <div className="community-1">
                <a href="#"><img src="website-development-banner.avif" alt="web-dev"/></a>
            </div>
            <div className="community-2">
                <a href="#"><img src="android-dev-banner.jpg" alt="machine-learing"/></a>
            </div>
            <div className="community-3">
                <a href="#"><img src="machine-learning-banner2.jpg" alt="machine-learing"/></a>
            </div>
            <div className="community-4">
                <a href="#"><img src="ui-banner2.jpg" alt="machine-learing"/></a>
            </div>
        </div>
        </div>
    
  )
}

export default Tyr

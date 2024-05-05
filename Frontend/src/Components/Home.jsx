import React, { useEffect, useMemo, useState } from "react";
import Leader from "./Leader";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Profile from "./Profile";
import "../assets/css/Profile.css";
import "../assets/css/Home.css";
import android from "../assets/images/android-dev-banner.jpg";
import banner1 from "../assets/images/banner1.png";
import machine from "../assets/images/machine-learning-banner2.jpg";
import uibanner from "../assets/images/ui-banner2.jpg";
import web from "../assets/images/website-development-banner.avif";


import Side from "./Side";
function Home({user}) {
  return (
    <div style={{ display: "flex", width: "100vw", height:"10vh"  }}>
      <Side user={user?.id}/>    
      <Outlet />
    </div>
  );
}

export default Home;

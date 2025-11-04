import React, { useEffect, useMemo, useState } from "react";
import Leader from "./Leader";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Profile from "./Profile";
import "../assets/css/Profile.css";
import "../assets/css/Home.css";



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

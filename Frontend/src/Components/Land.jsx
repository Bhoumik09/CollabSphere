import React, { useEffect, useState } from 'react';
import Features from './Features';
import Nav from './Nav';
import axios from 'axios';
import '../assets/css/Land.css'
function Land({user}) {
  return (
    <div>
      <Nav user={user}/>
      <Features />
    </div>
  );
}

export default Land;

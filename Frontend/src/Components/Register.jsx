import React, { useRef, useState } from 'react'
import '../assets/css/Register.css'
import axios from 'axios'
import random from 'random'
import { Navigate, useNavigate } from 'react-router-dom';
function Register({user,setUser}) {
  
  let navigate=useNavigate();
  const nameRef=useRef();
  const emailRef=useRef();
  const picRef=useRef();
  const gitRef=useRef();
  const linkRef=useRef();
  const [skills,setSkills]=useState([]);
  function handleChange(e){
    let skill=e.target.value;
    if(e.target.checked){
      setSkills([...skills,skill]);
    }else{
      setSkills(skills.filter((s)=>s!==skill));
    }
  }
  async function handleForm(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const github = gitRef.current.value;
    const linkedin = linkRef.current.value;
    const img = picRef.current.files[0];
    const formData = new FormData();
    let nameArr=JSON.stringify(name.split(' '));
    console.log(nameArr);
    
    formData.append('name', nameArr);
    formData.append('email', email);
    formData.append('github', github);
    formData.append('linkedin', linkedin);
    formData.append('img', img);
    formData.append('skills', JSON.stringify(skills));
    try {
      const response = await axios.post('http://localhost:8000/new/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }

      });
      setUser(prevUser=>({
        ...prevUser,profileExists:true
      }))
      navigate('/');
      
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
  console.log("This is register");
  console.log()
  return (
      <div >
        <div className="form-container">
          <form className="form" onSubmit={handleForm}>
            <p className="title">Account Info</p>
            <p className="message">Register now and get full access to our app.</p>
            <label htmlFor="upload-image" className="upload-button">Upload Image</label>
            <input type="file" id="upload-image" style={{display: 'none'}} ref={picRef} required />
            <div className="flex">
              <label>
                <input className="input" type="text" ref={nameRef} required />
                <span>Name</span>
              </label>
              <br /> 
            </div>
            <label>
              <input className="input" type="email" ref={emailRef}  value={user.emails[0].value} disabled />
              <span>Email</span>
            </label>
            <label>
              <input className="input" type="text" ref={gitRef} required />
              <span>GitHub</span>
            </label>
            <label>
              <input className="input" type="text" ref={linkRef} required />
              <span>LinkedIn</span>
            </label>
            <label>Skills:</label>
            <div className="checkbox-container">
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-1" className="inp-cbx" value="MERN" onChange={handleChange} />
                <label htmlFor="checkbox-1" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>MERN Stack</span>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-2" className="inp-cbx"  value="UI/UX" onChange={handleChange}/>
                <label htmlFor="checkbox-2" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>UI/UX</span>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-3" className="inp-cbx" value="AI" onChange={handleChange} />
                <label htmlFor="checkbox-3" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>AI</span>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-4" className="inp-cbx" value="ML" onChange={handleChange} />
                <label htmlFor="checkbox-4" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>ML</span>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-5" className="inp-cbx" value="APP" onChange={handleChange}/>
                <label htmlFor="checkbox-5" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>Android Dev</span>
                </label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" id="checkbox-6" className="inp-cbx" value="Editing" onChange={handleChange} />
                <label htmlFor="checkbox-6" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1" />
                    </svg>
                  </span>
                  <span>Editing</span>
                </label>
              </div>
            </div>
            <button className="button">
              <span className="button-content">Submit</span>
            </button>
          </form>
        </div>
      </div>
  )
}

export default Register

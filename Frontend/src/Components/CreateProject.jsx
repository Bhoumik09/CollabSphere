import React, { useRef } from "react";
import '../assets/css/projectMain.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function CreateProject({user}) {
    const ProjectTitle=useRef();
    const ProjectDesc=useRef();
    const ProjectGit=useRef();
    const ProjectField=useRef();
    let navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        let title=ProjectTitle.current.value;
        let desc=ProjectDesc.current.value;
        let git=ProjectGit.current.value;
        let field=ProjectField.current.value;
        ProjectTitle.current.value="";
        ProjectDesc.current.value="";
        ProjectGit.current.value="";
        ProjectField.current.value="";
        let id=user?.id;
        axios.post('http://localhost:8000/project/new',{title,desc,git,id,field});
        navigate('/app/project');
        
    }
  return (
    <div>
        <div className="container_modal">
            <form className="modal" onSubmit={handleSubmit}>
                <div className="modal__header">
                    <span className="modal__title">Create a new project</span>
                    
                </div>
                <div className="modal__body">
                    <div className="input">
                        <label className="input__label">Field of Project</label>
                        <input className="input__field" type="text" ref={ProjectField} required/> 
                    </div>
                    <div className="input">
                        <label className="input__label">Project title</label>
                        <input className="input__field" type="text" ref={ProjectTitle} required/> 
                    </div>
                    <div className="input">
                        <label className="input__label">Description</label>
                        <textarea className="input__field input__field--textarea" ref={ProjectDesc} required></textarea>
                    </div>

                    <div className="input">
                        <label className="input__label">Github Link</label>
                        <input className="input__field" type="text" ref={ProjectGit} required /> 
                    </div>
                </div>
                <div className="modal__footer">
                    <button className="button button--primary" type="submit">Create project</button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default CreateProject;

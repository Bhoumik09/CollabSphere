import React from 'react';

const ProjectCard = ({ title, field, link }) => {
  return (
    <div className="project-card" >
      <header>{field}</header>
      <p>{title}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Github <i className='bx bx-right-arrow-alt'></i>
      </a>
    </div>
  );
};

export default ProjectCard;
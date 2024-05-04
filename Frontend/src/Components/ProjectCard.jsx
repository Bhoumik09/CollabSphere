import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ title, field, link }) => {
  return (
    <div className="project-card" >
      <header>{field}</header>
      <p>{title}</p>
      <Link href={link} target="_blank">
        Github <i className='bx bx-right-arrow-alt'></i>
      </Link>
    </div>
  );
};

export default ProjectCard;
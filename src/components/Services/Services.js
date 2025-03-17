import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faGlobe, faChalkboardTeacher, faCubes } from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: faLaptopCode,
      title: 'Full Stack Development',
      description: 'Expertise in both front-end and back-end technologies, creating robust and scalable web applications from concept to deployment.'
    },
    {
      icon: faGlobe,
      title: 'Web Development',
      description: 'Crafting responsive and user-friendly websites using the latest web technologies and best practices in design and functionality.'
    },
    {
      icon: faChalkboardTeacher,
      title: 'Teaching',
      description: 'TEFL-certified instruction offering unique educational experiences in English.'
    },
    {
      icon: faCubes,
      title: '3D Design and Blender',
      description: 'Creating stunning 3D models, animations, and designs using Blender for various applications including game development and visualization.'
    }
  ];

  return (
    <section id="services">
      <div className="services container">
        <div className="services-header">
          <h1 className="section-title">Serv<span>i</span>ces</h1>
        </div>
        <p className="services-description">
          I offer full-stack web development, cloud solutions, DevOps, data analytics, automation scripting, game development, TEFL instruction, Chrome extension creation, and digital art and 3D game design.
        </p>
        <div className="service-bottom">
          {services.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faGlobe, faChalkboardTeacher, faCubes} from '@fortawesome/free-solid-svg-icons';
import './Services.css';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const servicesRef = useRef(null);
  const titleRef = useRef(null);

  const services = [
    {
      icon: faLaptopCode,
      title: 'Full Stack Development',
      description: 'Expertise in both front-end and back-end technologies, creating robust and scalable web applications from concept to deployment.',
      color: '#e74c3c'
    },
    {
      icon: faGlobe,
      title: 'Web Development',
      description: 'Crafting responsive and user-friendly websites using the latest web technologies and best practices in design and functionality.',
      color: '#3498db'
    },
    {
      icon: faChalkboardTeacher,
      title: 'Teaching',
      description: 'TEFL-certified instruction offering unique educational experiences in English.',
      color: '#2ecc71'
    },
    {
      icon: faCubes,
      title: '3D Design and Blender',
      description: 'Creating stunning 3D models, animations, and designs using Blender for various applications including game development and visualization.',
      color: '#9b59b6'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(servicesRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }

    // Add letter animation to title
    if (isVisible && titleRef.current) {
      const title = titleRef.current;
      const text = title.textContent;
      title.textContent = '';
      
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.1}s`;
        span.className = 'letter-animation';
        title.appendChild(span);
      }
    }

    return () => {
      if (servicesRef.current) {
        observer.unobserve(servicesRef.current);
      }
    };
  }, [isVisible]);

  const handleServiceClick = (index) => {
    setActiveService(activeService === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <section id="services" ref={servicesRef}>
      <div className="services-background"></div>
      <div className="services container">
        <div className={`services-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Services</h1>
          <div className="title-underline"></div>
        </div>
        <p className={`services-description ${isVisible ? 'animate' : ''}`}>
          I offer full-stack web development, cloud solutions, DevOps, data analytics, automation scripting, game development, TEFL instruction, Chrome extension creation, and digital art and 3D game design.
        </p>
        <div className={`service-bottom ${isVisible ? 'animate' : ''}`}>
          {services.map((service, index) => (
            <div 
              className={`service-item ${isVisible ? 'animate' : ''} ${activeService === index ? 'active' : ''} ${hoverIndex === index ? 'hover' : ''}`} 
              key={index}
              onClick={() => handleServiceClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                borderTop: activeService === index ? `4px solid ${service.color}` : ''
              }}
            >
              <div className="icon" style={{ background: `rgba(${hexToRgb(service.color)}, 0.1)` }}>
                <FontAwesomeIcon icon={service.icon} style={{ color: service.color }} />
              </div>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <div className="service-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

export default Services; 
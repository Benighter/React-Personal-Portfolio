import React, { useState, useEffect, useRef, useCallback } from 'react';
import './About.css';
import blenderImage from '../../assets/img/img-2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, 
  faCode, 
  faTools, 
  faLightbulb, 
  faHandshake,
  faChartLine,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const hoverTimerRef = useRef(null);

  // Application & Tool Knowledge
  const toolKnowledge = [
    { name: 'Angular', proficiency: 90, color: '#DD0031' },
    { name: 'JavaScript', proficiency: 95, color: '#F7DF1E' },
    { name: 'PostgreSQL', proficiency: 85, color: '#336791' },
    { name: 'Spring Boot', proficiency: 88, color: '#6DB33F' },
    { name: 'CSS', proficiency: 92, color: '#1572B6' },
    { name: 'HTML', proficiency: 95, color: '#E34F26' },
    { name: 'Git', proficiency: 88, color: '#F05032' }
  ];

  // Technical Skills
  const technicalSkills = [
    { name: 'Overall Rating', initial: 1.5, current: 3.8 },
    { name: 'Angular', initial: 1.2, current: 3.7 },
    { name: 'HTML & CSS', initial: 1.3, current: 4.5 },
    { name: 'Java Spring Boot', initial: 1.2, current: 3.6 },
    { name: 'PostgreSQL', initial: 1.5, current: 4.3 },
    { name: 'Git', initial: 1.7, current: 3.5 }
  ];

  // Soft Skills
  const softSkills = [
    { name: 'Problem Solving', rating: 4, description: 'Analytical thinking and creative solution finding' },
    { name: 'Interpersonal Skills', rating: 3, description: 'Effective communication and relationship building' },
    { name: 'Leadership', rating: 3, description: 'Team guidance and project management' },
    { name: 'Team Collaboration', rating: 4, description: 'Working effectively in diverse teams' },
    { name: 'Communication', rating: 3, description: 'Clear and concise information sharing' }
  ];

  // Function to convert hex to rgba for styling
  const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Debounce function to prevent rapid state changes
  const debounce = (func, delay) => {
    return (...args) => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      hoverTimerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(aboutRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
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
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      // Clear any pending timers on unmount
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isVisible]);

  // Handle mouse enter/leave with debouncing to prevent rapid state changes
  const handleMouseEnter = useCallback(
    debounce(() => {
      setIsHovering(true);
    }, 50),
    []
  );

  const handleMouseLeave = useCallback(
    debounce(() => {
      setIsHovering(false);
    }, 50),
    []
  );

  // Skills data for potential future use
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'Blender', level: 70 }
  ];

  return (
    <section id="about" ref={aboutRef}>
      <div className="about-background"></div>
      <div className="about container">
        <div className={`about-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>About</h1>
          <div className="title-underline"></div>
        </div>
        <div className="about-content">
          <div className={`col-left ${isVisible ? 'animate' : ''}`}>
            <div 
              className={`about-img ${isHovering ? 'hovering' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={imgRef}
            >
              <img src={blenderImage} alt="About Me" />
              <div className="img-overlay"></div>
            </div>
          </div>
          <div className={`col-right ${isVisible ? 'animate' : ''}`}>
            <h2 className="job-title">Full Stack Developer & 3D Designer</h2>
            <div className="about-text-container">
              <p className="about-text">
                As a Full Stack Developer, I thrive on transforming innovative ideas into powerful, scalable applications. 
                My expertise spans the entire development spectrum - from crafting intuitive user interfaces with React and 
                Angular to architecting robust backend systems using Spring Boot and Node.js. I take pride in writing clean, 
                maintainable code that stands the test of time and scale.
              </p>
              <p className="about-text">
                What sets me apart is my unique blend of technical prowess and creative vision. With advanced proficiency 
                in PostgreSQL database design, RESTful API development, and modern JavaScript frameworks, I build seamless 
                digital experiences that users love. My commitment to responsive design and performance optimization ensures 
                that every application I create delivers exceptional user experience across all devices.
              </p>
              <p className="about-text">
                I'm not just a developer; I'm a problem solver and innovator. Whether it's optimizing complex database queries, 
                implementing secure authentication systems, or creating intuitive user interfaces, I approach each challenge 
                with analytical thinking and creative solutions. My experience with Git version control and agile methodologies 
                makes me an effective team player who can adapt quickly to changing project requirements.
              </p>
            </div>
            <a href="/Resume/My Resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
              Download Resume <FontAwesomeIcon icon={faDownload} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 
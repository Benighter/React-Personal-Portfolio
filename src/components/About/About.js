import React, { useState, useEffect, useRef, useCallback } from 'react';
import './About.css';
import blenderImage from '../../assets/img/img-2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const hoverTimerRef = useRef(null);

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
                I'm a passionate Full Stack Developer with expertise in both front-end and back-end technologies. 
                I specialize in creating responsive, user-friendly web applications using modern frameworks and libraries.
                With a strong foundation in JavaScript, React, Node.js, and Python, I build scalable and efficient solutions 
                for complex problems.
              </p>
              <p className="about-text">
                Beyond web development, I'm also skilled in 3D design using Blender, creating immersive visual experiences 
                and assets for various applications. My background in teaching (TEFL certified) has enhanced my communication 
                skills and ability to explain complex concepts in simple terms.
              </p>
              <p className="about-text">
                I'm constantly learning and exploring new technologies to stay at the forefront of the rapidly evolving 
                tech landscape. I'm passionate about creating clean, efficient code and delivering high-quality products 
                that exceed client expectations.
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
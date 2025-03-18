import React, { useState, useEffect, useRef, useCallback } from 'react';
import './About.css';
import blenderImage from '../../assets/img/img-2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload
} from '@fortawesome/free-solid-svg-icons';
import './About.css';

// Move debounce outside component
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);

  // Memoize the handlers with useCallback
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Create debounced versions of the handlers
  const debouncedMouseEnter = useCallback(
    debounce(handleMouseEnter, 50),
    [handleMouseEnter]
  );

  const debouncedMouseLeave = useCallback(
    debounce(handleMouseLeave, 50),
    [handleMouseLeave]
  );

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
    };
  }, [isVisible]);

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
              onMouseEnter={debouncedMouseEnter}
              onMouseLeave={debouncedMouseLeave}
              ref={imgRef}
            >
              <img src={blenderImage} alt="About Me" />
              <div className="img-overlay"></div>
            </div>
          </div>
          <div className={`col-right ${isVisible ? 'animate' : ''}`}>
            <h2 className="job-title">Junior Fullstack Developer</h2>
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
            <br />
            <br />
            <br />
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
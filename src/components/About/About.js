import React, { useState, useEffect, useRef } from 'react';
import './About.css';
import blenderImage from '../../assets/img/img-2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);
  const titleRef = useRef(null);

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
            <div className="about-img">
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
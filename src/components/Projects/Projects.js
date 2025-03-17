import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './Projects.css';

// Import project images
import weatherNexus from '../../assets/img/weather-nexus.png';
import neolex from '../../assets/img/Neolex.png';
import triviaGame from '../../assets/img/Trivia Game.png';
import movieSite from '../../assets/img/Movie Site.png';
import clock from '../../assets/img/Clock.png';
import duplicateDetective from '../../assets/img/DuplicateDetective.png';
import chatbot from '../../assets/img/Chatbot.png';
import aiDetect from '../../assets/img/AI Detect.png';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);
  const titleRef = useRef(null);

  const projects = [
    {
      title: 'Weather Nexus',
      description: 'A weather application that provides real-time weather data and forecasts for locations worldwide.',
      image: weatherNexus,
      link: '#',
      color: '#e74c3c'
    },
    {
      title: 'Neolex',
      description: 'A modern legal research platform with advanced search capabilities and document management.',
      image: neolex,
      link: '#',
      color: '#3498db'
    },
    {
      title: 'Trivia Game',
      description: 'An interactive trivia game with multiple categories and difficulty levels.',
      image: triviaGame,
      link: '#',
      color: '#2ecc71'
    },
    {
      title: 'Movie Site',
      description: 'A movie database website with information on thousands of films, actors, and directors.',
      image: movieSite,
      link: '#',
      color: '#9b59b6'
    },
    {
      title: 'Clock App',
      description: 'A digital clock application with alarm, timer, and stopwatch functionality.',
      image: clock,
      link: '#',
      color: '#f39c12'
    },
    {
      title: 'Duplicate Detective',
      description: 'A tool for finding and managing duplicate files on your computer.',
      image: duplicateDetective,
      link: '#',
      color: '#1abc9c'
    },
    {
      title: 'AI Chatbot',
      description: 'An intelligent chatbot powered by machine learning for customer support.',
      image: chatbot,
      link: '#',
      color: '#d35400'
    },
    {
      title: 'AI Detector',
      description: 'A tool that can detect AI-generated content and distinguish it from human-written text.',
      image: aiDetect,
      link: '#',
      color: '#8e44ad'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      
      if (carouselRef.current) {
        const projectItems = carouselRef.current.querySelectorAll('.project-item');
        if (projectItems.length > 0) {
          const width = projectItems[0].offsetWidth + 30; // 30px for gap
          setItemWidth(width);
          setTotalProjects(projects.length - (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3));
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(projectsRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
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
      window.removeEventListener('resize', handleResize);
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, [projects.length, isVisible]);

  const nextSlide = () => {
    if (currentIndex < totalProjects) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Smooth return to start
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Smooth return to end
      setCurrentIndex(totalProjects);
    }
  };

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  return (
    <section id="projects" ref={projectsRef}>
      <div className="projects-background"></div>
      <div className="projects container">
        <div className={`projects-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Projects</h1>
          <div className="title-underline"></div>
        </div>
        <p className={`projects-description ${isVisible ? 'animate' : ''}`}>
          Explore my portfolio of web applications, tools, and creative projects that showcase my skills in development and design.
        </p>
        <div className={`projects-carousel ${isVisible ? 'animate' : ''}`}>
          <div 
            className="carousel-container" 
            ref={carouselRef}
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {projects.map((project, index) => (
              <div 
                className={`project-item ${isVisible ? 'animate' : ''}`} 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  borderTop: `4px solid ${project.color}`
                }}
              >
                <div className="project-img">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay" style={{ background: `rgba(${hexToRgb(project.color)}, 0.8)` }}></div>
                </div>
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <a href={project.link} className="view-more" style={{ color: project.color }}>
                    View Project <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className="nav-button prev" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="nav-button next" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects; 
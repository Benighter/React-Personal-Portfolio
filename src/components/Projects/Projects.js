import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faExternalLinkAlt, faRocket, faStar } from '@fortawesome/free-solid-svg-icons';
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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const resizeTimeoutRef = useRef(null);
  const starsCreatedRef = useRef(false);

  const projects = [
    {
      title: 'Weather Nexus',
      description: 'A weather application that provides real-time weather data and forecasts for locations worldwide.',
      image: weatherNexus,
      link: '#',
      color: '#5e72e4'
    },
    {
      title: 'Neolex',
      description: 'A modern legal research platform with advanced search capabilities and document management.',
      image: neolex,
      link: '#',
      color: '#11cdef'
    },
    {
      title: 'Trivia Game',
      description: 'An interactive trivia game with multiple categories and difficulty levels.',
      image: triviaGame,
      link: '#',
      color: '#2dce89'
    },
    {
      title: 'Movie Site',
      description: 'A movie database website with information on thousands of films, actors, and directors.',
      image: movieSite,
      link: '#',
      color: '#fb6340'
    },
    {
      title: 'Clock App',
      description: 'A digital clock application with alarm, timer, and stopwatch functionality.',
      image: clock,
      link: '#',
      color: '#ffd600'
    },
    {
      title: 'Duplicate Detective',
      description: 'A tool for finding and managing duplicate files on your computer.',
      image: duplicateDetective,
      link: '#',
      color: '#f5365c'
    },
    {
      title: 'AI Chatbot',
      description: 'An intelligent chatbot powered by machine learning for customer support.',
      image: chatbot,
      link: '#',
      color: '#8965e0'
    },
    {
      title: 'AI Detector',
      description: 'A tool that can detect AI-generated content and distinguish it from human-written text.',
      image: aiDetect,
      link: '#',
      color: '#1aae6f'
    }
  ];

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    
    resizeTimeoutRef.current = setTimeout(() => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
      
      if (carouselRef.current) {
        const projectItems = carouselRef.current.querySelectorAll('.project-item');
        if (projectItems.length > 0) {
          const width = projectItems[0].offsetWidth + 40; // 40px for gap
          setItemWidth(width);
          setTotalProjects(projects.length - (window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3));
        }
      }
    }, 200); // 200ms throttle
  }, [projects.length]);

  // Optimized letter animation
  const animateTitle = useCallback(() => {
    if (isVisible && titleRef.current) {
      const title = titleRef.current;
      const text = title.textContent;
      
      // Only animate if not already animated
      if (!title.querySelector('.letter-animation')) {
        title.textContent = '';
        
        // Create a document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span');
          span.textContent = text[i];
          span.style.animationDelay = `${i * 0.1}s`;
          span.className = 'letter-animation';
          fragment.appendChild(span);
        }
        
        title.appendChild(fragment);
      }
    }
  }, [isVisible]);

  // Optimized star creation
  const createStars = useCallback(() => {
    // Only create stars once
    if (starsCreatedRef.current) return;
    
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    // Reduced number of stars
    const starCount = 20; // Reduced from 50
    
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random size (smaller range)
      const size = Math.random() * 2 + 1;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.3;
      
      star.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background-color: white;
        border-radius: 50%;
        opacity: ${opacity};
        z-index: 0;
      `;
      
      fragment.appendChild(star);
    }
    
    projectsSection.appendChild(fragment);
    starsCreatedRef.current = true;
  }, []);

  useEffect(() => {
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
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  // Separate effect for animations to avoid unnecessary re-renders
  useEffect(() => {
    if (isVisible) {
      animateTitle();
      createStars();
    }
  }, [isVisible, animateTitle, createStars]);

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
                  animationDelay: `${index * 0.1}s`, // Reduced from 0.2s
                  '--project-color': project.color
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="project-img">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay" style={{ background: `rgba(${hexToRgb(project.color)}, 0.7)` }}>
                    {hoveredIndex === index && (
                      <FontAwesomeIcon 
                        icon={faRocket} 
                        style={{ 
                          fontSize: '2.5rem', // Reduced from 3rem
                          color: 'white',
                          animation: 'pulse 2s infinite'
                        }} 
                      />
                    )}
                  </div>
                </div>
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <a href={project.link} className="view-more" style={{ color: project.color }}>
                    Explore Project <FontAwesomeIcon icon={faExternalLinkAlt} />
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
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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

  const projects = [
    {
      title: 'Weather Nexus',
      description: 'A weather application that provides real-time weather data and forecasts for locations worldwide.',
      image: weatherNexus,
      link: '#'
    },
    {
      title: 'Neolex',
      description: 'A modern legal research platform with advanced search capabilities and document management.',
      image: neolex,
      link: '#'
    },
    {
      title: 'Trivia Game',
      description: 'An interactive trivia game with multiple categories and difficulty levels.',
      image: triviaGame,
      link: '#'
    },
    {
      title: 'Movie Site',
      description: 'A movie database website with information on thousands of films, actors, and directors.',
      image: movieSite,
      link: '#'
    },
    {
      title: 'Clock App',
      description: 'A digital clock application with alarm, timer, and stopwatch functionality.',
      image: clock,
      link: '#'
    },
    {
      title: 'Duplicate Detective',
      description: 'A tool for finding and managing duplicate files on your computer.',
      image: duplicateDetective,
      link: '#'
    },
    {
      title: 'AI Chatbot',
      description: 'An intelligent chatbot powered by machine learning for customer support.',
      image: chatbot,
      link: '#'
    },
    {
      title: 'AI Detector',
      description: 'A tool that can detect AI-generated content and distinguish it from human-written text.',
      image: aiDetect,
      link: '#'
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
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projects.length]);

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

  return (
    <section id="projects">
      <div className="projects container">
        <div className="projects-header">
          <h1 className="section-title">Recent <span>Projects</span></h1>
        </div>
        <div className="projects-carousel">
          <div 
            className="carousel-container" 
            ref={carouselRef}
            style={{ transform: `translateX(-${currentIndex * itemWidth}px)` }}
          >
            {projects.map((project, index) => (
              <div className="project-item" key={index}>
                <div className="project-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <a href={project.link} className="view-more">View More</a>
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
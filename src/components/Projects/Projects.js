import React, { useState, useRef, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faCode,   
  faGamepad, 
  faPalette, 
  faGlobe,
  faAtom,
  faSatellite,
  faMeteor,
  faSpaceShuttle,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import './Projects.css';

// Import project images
import weatherNexus from '../../assets/img/weather-nexus.png';
import neolex from '../../assets/img/Neolex.png';
import triviaGame from '../../assets/img/Trivia Game.png';
import movieSite from '../../assets/img/Movie Site.png';
import clock from '../../assets/img/Clock.png';
import colorSwitch from '../../assets/img/colorSwitch.png';
import savoryExplorer from '../../assets/img/SavoryExplorer.png';
import wordWise from '../../assets/img/wordWise.png';

// Define categories with icons and colors
const categories = [
  { id: 'all', name: 'All Projects', icon: faAtom, color: '94, 114, 228' },
  { id: 'featured', name: 'Featured', icon: faStar, color: '236, 64, 122' },
  { id: 'web', name: 'Web Apps', icon: faGlobe, color: '45, 206, 137' },
  { id: 'game', name: 'Games', icon: faGamepad, color: '251, 99, 64' },
  { id: 'ui', name: 'UI/UX', icon: faPalette, color: '255, 214, 0' }
];

const ProjectCard = ({ project, index, moveCard, isFocused, onClick }) => {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'project',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'project',
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref}
      className={`project-card ${isFocused ? 'focused' : ''} ${isDragging ? 'dragging' : ''} ${project.featured ? 'featured' : ''}`}
      style={{ 
        '--project-color': project.color,
        '--project-color-rgb': project.colorRgb,
        '--orbit-distance': `${150 + (index % 3) * 100}px`,
        '--orbit-speed': `${10 + index % 5}s`,
        '--orbit-delay': `-${index * 2}s`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
      onClick={onClick}
    >
      <div className="content-wrapper">
        {project.featured && (
          <div className="featured-badge" style={{ backgroundColor: project.color }}>
            <FontAwesomeIcon icon={faStar} /> Featured
          </div>
        )}
        <div className="project-img">
          <img src={project.image} alt={project.title} />
          <div className="project-overlay">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="view-more" 
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon icon={faRocket} className="project-icon" />
            </a>
          </div>
        </div>
        <div className="project-info">
          <h2>{project.title}</h2>
          <div className="project-categories">
            {project.categories.map((cat, i) => {
              const catData = categories.find(c => c.id === cat);
              return (
                <span 
                  key={i} 
                  className="project-category"
                  style={{ 
                    backgroundColor: `rgba(${catData?.color || '94, 114, 228'}, 0.2)`,
                    border: `1px solid rgba(${catData?.color || '94, 114, 228'}, 0.4)`
                  }}
                >
                  <FontAwesomeIcon icon={catData?.icon || faCode} />
                  {cat}
                </span>
              );
            })}
          </div>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orbitActive, setOrbitActive] = useState(false);
  const [focusedProject, setFocusedProject] = useState(null);
  const [particles, setParticles] = useState([]);
  const particleCanvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [projectsList, setProjectsList] = useState([
    {
      title: 'SavoryExplorer',
      description: 'SavoryExplorer is a modern food recipe application that allows users to discover and explore recipes from around the world. Built with Next.js, TypeScript, and Tailwind CSS, it offers a responsive and intuitive user experience across all devices.',
      image: savoryExplorer,
      link: 'https://savory-explorer.vercel.app/',
      color: '#38a169',
      colorRgb: '56, 161, 105',
      categories: ['web', 'ui'],
      featured: true
    },
    {
      title: 'WordWise',
      description: 'WordWise is a comprehensive dictionary application that allows users to look up word definitions, hear pronunciations, and organize their vocabulary. It features user authentication, search history tracking, favorites system, word categories, and a Word of the Day feature.',
      image: wordWise,
      link: 'https://word-wise-tau.vercel.app/',
      color: '#4299e1',
      colorRgb: '66, 153, 225',
      categories: ['web', 'ui'],
      featured: true
    },
    {
      title: 'Color Switch Clone',
      description: 'An addictive arcade game where players navigate a ball through color-coded obstacles.',
      image: colorSwitch,
      link: 'https://color-switch-clone.vercel.app/',
      color: '#ff6b6b',
      colorRgb: '255, 107, 107',
      categories: ['game', 'ui']
    },
    {
      title: 'Weather Nexus',
      description: 'A weather application providing real-time weather data and forecasts.',
      image: weatherNexus,
      link: 'https://benighter.github.io/Weather-App/',
      color: '#5e72e4',
      colorRgb: '94, 114, 228',
      categories: ['web', 'ui']
    },
    {
      title: 'Neolex',
      description: 'A modern legal research platform with advanced search capabilities.',
      image: neolex,
      link: 'https://benighter.github.io/Dictionary/',
      color: '#11cdef',
      colorRgb: '17, 205, 239',
      categories: ['web']
    },
    {
      title: 'Trivia Game',
      description: 'An interactive trivia game with multiple categories.',
      image: triviaGame,
      link: 'https://benighter.itch.io/trivia-master',
      color: '#2dce89',
      colorRgb: '45, 206, 137',
      categories: ['game']
    },
    {
      title: 'Movie Site',
      description: 'A movie database website with comprehensive film information.',
      image: movieSite,
      link: 'https://benighter.github.io/Movie-site/',
      color: '#fb6340',
      colorRgb: '251, 99, 64',
      categories: ['web', 'ui']
    },
    {
      title: 'Clock App',
      description: 'A digital clock with alarm and timer functionality.',
      image: clock,
      link: 'https://futuristic-clock.vercel.app/',
      color: '#ffd600',
      colorRgb: '255, 214, 0',
      categories: ['web', 'ui']
    }
  ]);
  
  // Optimized letter animation
  const animateTitle = useCallback(() => {
    if (isVisible && titleRef.current && !titleRef.current.querySelector('.letter-animation')) {
      const title = titleRef.current;
      const text = title.textContent;
      title.textContent = '';
      const fragment = document.createDocumentFragment();
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        span.className = 'letter-animation';
        fragment.appendChild(span);
      });
      
      title.appendChild(fragment);
    }
  }, [isVisible]);

  // Create interactive particle system with reduced particle count
  const initParticles = useCallback(() => {
    if (!isVisible || !particleCanvasRef.current) return;
    
    const canvas = particleCanvasRef.current;
    const container = document.getElementById('projects');
    if (!container) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    const particleCount = Math.min(Math.floor(window.innerWidth * 0.02), 50); // Reduced particle count
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1, // Smaller particles
      speedX: (Math.random() - 0.5) * 0.5, // Reduced speed
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${Math.floor(Math.random() * 200 + 55)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.floor(Math.random() * 255)}, 0.5)`
    }));
    
    setParticles(newParticles);
  }, [isVisible]);

  // Optimized particle animation
  const animateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Simple boundary checking
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    animationFrameRef.current = requestAnimationFrame(animateParticles);
  }, [particles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      animateTitle();
      initParticles();
    }
  }, [isVisible, animateTitle, initParticles]);

  useEffect(() => {
    if (isVisible && particles.length > 0) {
      animationFrameRef.current = requestAnimationFrame(animateParticles);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, particles, animateParticles]);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => isVisible && initParticles();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible, initParticles]);

  // Simplified category filter
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setFocusedProject(null);
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setProjectsList((prevCards) => {
      const newCards = [...prevCards];
      const dragCard = newCards[dragIndex];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      return newCards;
    });
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projectsList 
    : selectedCategory === 'featured'
    ? projectsList.filter(project => project.featured)
    : projectsList.filter(project => project.categories.includes(selectedCategory));

  // Sort to prioritize featured projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <section id="projects" ref={projectsRef}>
        <canvas ref={particleCanvasRef} className="particle-canvas"></canvas>
        <div className="projects-background"></div>
        
        <div className="universe-controls">
          <button 
            className={`universe-control ${orbitActive ? 'active' : ''}`} 
            onClick={() => {
              setOrbitActive(!orbitActive);
              setFocusedProject(null);
            }}
            title={orbitActive ? "Disable Orbit View" : "Enable Orbit View"}
          >
            <FontAwesomeIcon icon={faSatellite} />
          </button>
        </div>
        
        <div className="projects container">
          <div className={`projects-header ${isVisible ? 'animate' : ''}`}>
            <h1 className="section-title" ref={titleRef}>
              <FontAwesomeIcon icon={faSpaceShuttle} className="title-icon" /> Projects
            </h1>
            <div className="title-underline"></div>
          </div>
          
          <div className={`category-filter ${isVisible ? 'animate' : ''}`}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon-wrapper">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className={`projects-grid ${isVisible ? 'animate' : ''} ${orbitActive ? 'orbit-active' : ''}`}>
            {sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                index={index}
                project={project}
                moveCard={moveCard}
                isFocused={focusedProject === index}
                onClick={() => setFocusedProject(focusedProject === index ? null : index)}
              />
            ))}
          </div>
          
          {sortedProjects.length === 0 && (
            <div className="no-projects">
              <FontAwesomeIcon icon={faMeteor} className="empty-icon" />
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </DndProvider>
  );
};

export default Projects; 
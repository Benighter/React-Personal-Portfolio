import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    {
      name: 'HTML/CSS',
      percentage: 95,
      icon: 'fab fa-html5',
      description: 'Proficient in creating responsive and accessible web pages using modern HTML5 and CSS3 features including Flexbox, Grid, and CSS animations. Experienced with CSS preprocessors like SASS and frameworks like Bootstrap and Tailwind CSS.'
    },
    {
      name: 'JavaScript',
      percentage: 90,
      icon: 'fab fa-js',
      description: 'Strong knowledge of JavaScript ES6+ features, DOM manipulation, asynchronous programming with Promises and async/await. Experienced with modern frameworks and libraries like React, Vue, and jQuery.'
    },
    {
      name: 'React',
      percentage: 85,
      icon: 'fab fa-react',
      description: 'Experienced in building single-page applications with React, using hooks, context API, and Redux for state management. Familiar with React Router for navigation and styled-components for styling.'
    },
    {
      name: 'Node.js',
      percentage: 80,
      icon: 'fab fa-node-js',
      description: 'Skilled in server-side JavaScript using Node.js, creating RESTful APIs with Express, and working with databases like MongoDB and MySQL. Experience with authentication, file uploads, and real-time applications using Socket.io.'
    },
    {
      name: 'Python',
      percentage: 75,
      icon: 'fab fa-python',
      description: 'Proficient in Python for web development, data analysis, and automation. Experience with frameworks like Django and Flask, and libraries like Pandas and NumPy for data processing.'
    },
    {
      name: 'UI/UX Design',
      percentage: 70,
      icon: 'fas fa-paint-brush',
      description: 'Knowledge of user interface and experience design principles, wireframing, prototyping, and creating user-centered designs. Familiar with design tools like Figma and Adobe XD.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const openModal = (skill) => {
    setActiveSkill(skill);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside
  const handleModalClick = (e) => {
    if (e.target.classList.contains('skill-modal')) {
      closeModal();
    }
  };

  // Animation for percentage counters
  const animateValue = (id, start, end, duration) => {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const element = document.getElementById(id);
    
    if (!element) return;
    
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current + '%';
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  useEffect(() => {
    if (isVisible) {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          animateValue(`skill-percentage-${index}`, 0, skill.percentage, 1000);
        }, index * 200);
      });
    }
  }, [isVisible, skills]);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills container">
        <div className="skills-header">
          <h1 className="section-title">Sk<span>i</span>lls</h1>
        </div>
        <div className="skills-carousel">
          <div className="carousel-container">
            {skills.map((skill, index) => (
              <div 
                className="skill-item" 
                key={index} 
                onClick={() => openModal(skill)}
              >
                <div className="skill-info">
                  <div className="skill-icon">
                    <i className={skill.icon}></i>
                  </div>
                  <h2>{skill.name}</h2>
                  <div className="skill-percentage" id={`skill-percentage-${index}`}>
                    {isVisible ? `${skill.percentage}%` : '0%'}
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ 
                        width: isVisible ? `${skill.percentage}%` : '0%',
                        transition: `width 1.5s ease-in-out ${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      <div 
        className={`skill-modal ${isModalOpen ? 'active' : ''}`}
        onClick={handleModalClick}
      >
        <div className="skill-modal-content">
          <span className="close-modal" onClick={closeModal}>&times;</span>
          {activeSkill && (
            <>
              <h2 id="modal-skill-title">{activeSkill.name}</h2>
              <div className="modal-skill-percentage">
                {activeSkill.percentage}%
              </div>
              <div className="modal-skill-bar">
                <div 
                  className="modal-skill-progress" 
                  style={{ width: `${activeSkill.percentage}%` }}
                ></div>
              </div>
              <p id="modal-skill-description">{activeSkill.description}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills; 
import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

  // Application & Tool Knowledge
  const toolKnowledge = useMemo(() => [
    { name: 'Angular', color: '#DD0031' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Spring Boot', color: '#6DB33F' },
    { name: 'Tailwind CSS', color: '#38B2AC' },
    { name: 'HTML', color: '#E34F26' },
    { name: 'Git', color: '#F05032' }
  ], []);

  // Technical Skills with initial and final assessment values
  const technicalSkills = useMemo(() => [
    { name: 'Overall Rating', initial: 1.5, final: 3.8, color: '#e74c3c' },
    { name: 'Angular', initial: 1.2, final: 3.7, color: '#3498db' },
    { name: 'HTML & CSS', initial: 1.3, final: 4.5, color: '#2ecc71' },
    { name: 'Java Spring Boot', initial: 1.2, final: 3.6, color: '#9b59b6' },
    { name: 'PostgreSQL', initial: 1.5, final: 4.3, color: '#f39c12' },
    { name: 'Git', initial: 1.7, final: 3.5, color: '#1abc9c' }
  ], []);

  // Soft Skills
  const softSkills = useMemo(() => [
    { name: 'Problem Solving', rating: '4/5', color: '#e74c3c' },
    { name: 'Interpersonal Skills', rating: '3/5', color: '#3498db' },
    { name: 'Leadership Skills', rating: '3/5', color: '#2ecc71' },
    { name: 'Team Player Skills', rating: '4/5', color: '#9b59b6' },
    { name: 'Communication', rating: '3/5', color: '#f39c12' }
  ], []);

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

    const currentRef = skillsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
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
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  // Animation for bars
  useEffect(() => {
    if (isVisible) {
      const bars = document.querySelectorAll('.skill-progress-bar');
      bars.forEach((bar) => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }
  }, [isVisible]);

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills-background"></div>
      <div className="skills container">
        <div className={`skills-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Skills</h1>
          <div className="title-underline"></div>
        </div>
        <p className={`skills-description ${isVisible ? 'animate' : ''}`}>
          My technical expertise spans across various technologies and tools, complemented by strong soft skills that enable effective collaboration and project delivery.
        </p>

        {/* Application & Tool Knowledge */}
        <div className={`tool-knowledge-section ${isVisible ? 'animate' : ''}`}>
          <h2>Application & Tool Knowledge</h2>
          <div className="tool-knowledge-container">
            {toolKnowledge.map((tool, index) => (
              <div 
                className="tool-item" 
                key={index} 
                style={{ 
                  borderColor: tool.color,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className={`technical-skills-section ${isVisible ? 'animate' : ''}`}>
          <h2>Technical Skills</h2>
          <div className="technical-skills-container">
            {technicalSkills.map((skill, index) => (
              <div 
                className="technical-skill-item" 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderTop: `4px solid ${skill.color}`
                }}
              >
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar-container">
                  <div className="skill-bar-background">
                    <div 
                      className="skill-progress-bar initial" 
                      style={{ 
                        width: isVisible ? `${skill.initial * 20}%` : '0%',
                        backgroundColor: `rgba(${hexToRgb(skill.color)}, 0.5)`
                      }}
                      data-width={`${skill.initial * 20}%`}
                    ></div>
                    <div 
                      className="skill-progress-bar final" 
                      style={{ 
                        width: isVisible ? `${skill.final * 20}%` : '0%',
                        backgroundColor: skill.color
                      }}
                      data-width={`${skill.final * 20}%`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <div className="skill-legend">
              <div className="legend-item">
                <div className="legend-color initial"></div>
                <span>Initial Assessment</span>
              </div>
              <div className="legend-item">
                <div className="legend-color final"></div>
                <span>Final Assessment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className={`soft-skills-section ${isVisible ? 'animate' : ''}`}>
          <h2>Soft Skills</h2>
          <div className="soft-skills-container">
            <div className="most-improved">
              <h3>Most Improved Skill:</h3>
              <h2>Team Player</h2>
            </div>
            {softSkills.map((skill, index) => (
              <div 
                className="soft-skill-item" 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  borderTop: `4px solid ${skill.color}`
                }}
              >
                <div 
                  className="skill-rating-circle"
                  style={{ background: `rgba(${hexToRgb(skill.color)}, 0.1)` }}
                >
                  <div className="circle-inner" style={{ borderColor: skill.color }}>
                    <span style={{ color: skill.color }}>{skill.rating}</span>
                  </div>
                </div>
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Shaper Review */}
        <div className={`shaper-review-section ${isVisible ? 'animate' : ''}`}>
          <h2>The Shaper Review</h2>
          <div className="review-content">
            <p>
              He is a detail-oriented Full Stack developer who consistently
              delivers high-quality work. His clear communication and
              adaptability make him a valuable part of any development team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
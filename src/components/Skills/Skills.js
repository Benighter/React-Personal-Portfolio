import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Skills.css';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);
  const titleRef = useRef(null);

  // Application & Tool Knowledge
  const toolKnowledge = useMemo(() => [
    { name: 'Angular', color: '#DD0031', rgb: '221, 0, 49' },
    { name: 'JavaScript', color: '#F7DF1E', rgb: '247, 223, 30' },
    { name: 'PostgreSQL', color: '#336791', rgb: '51, 103, 145' },
    { name: 'Spring Boot', color: '#6DB33F', rgb: '109, 179, 63' },
    { name: 'CSS', color: '#1572B6', rgb: '21, 114, 182' },
    { name: 'HTML', color: '#E34F26', rgb: '227, 79, 38' },
    { name: 'Git', color: '#F05032', rgb: '240, 80, 50' }
  ], []);

  // Technical Skills with initial and final assessment values
  const technicalSkills = useMemo(() => [
    { name: 'Overall Rating', initial: 1.5, final: 3.8, color: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'Angular', initial: 1.2, final: 3.7, color: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'HTML & CSS', initial: 1.3, final: 4.5, color: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'Java Spring Boot', initial: 1.2, final: 3.6, color: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'PostgreSQL', initial: 1.5, final: 4.3, color: '#00BFFF', rgb: '0, 191, 255' },
    { name: 'Git', initial: 1.7, final: 3.5, color: '#00BFFF', rgb: '0, 191, 255' }
  ], []);

  // Soft Skills
  const softSkills = useMemo(() => [
    { name: 'Problem Solving', rating: '4/5', color: '#FF6B6B', rgb: '255, 107, 107', percent: 80 },
    { name: 'Interpersonal Skills', rating: '3/5', color: '#FF6B6B', rgb: '255, 107, 107', percent: 60 },
    { name: 'Leadership Skills', rating: '3/5', color: '#FF6B6B', rgb: '255, 107, 107', percent: 60 },
    { name: 'Team Player Skills', rating: '4/5', color: '#FF6B6B', rgb: '255, 107, 107', percent: 80 },
    { name: 'Communication', rating: '3/5', color: '#FF6B6B', rgb: '255, 107, 107', percent: 60 }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(skillsRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  useEffect(() => {
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
  }, [isVisible]);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills-background"></div>
      <div className="skills container">
        <div className={`skills-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Skills</h1>
          <div className="title-underline"></div>
        </div>


        {/* Application & Tool Knowledge */}
        <div className={`tool-knowledge-section ${isVisible ? 'animate' : ''}`}>
          <h2>APPLICATION & TOOL KNOWLEDGE</h2>
          <div className="tool-knowledge-container">
            {toolKnowledge.map((tool, index) => (
              <div 
                className="tool-item" 
                key={index}
                style={{ 
                  '--tool-color': tool.color,
                  '--tool-rgb': tool.rgb,
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
          <h2>TECHNICAL SKILLS</h2>
          <div className="technical-skills-container">
            {technicalSkills.map((skill, index) => (
              <div 
                className="technical-skill-item" 
                key={index}
                style={{ 
                  '--skill-color': skill.color,
                  '--skill-rgb': skill.rgb,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="skill-header">
                  <div className="skill-name">{skill.name}</div>
                </div>
                <div className="skill-bar-container">
                  <div className="skill-bar-background">
                    <div 
                      className="skill-progress-bar initial" 
                      style={{ 
                        width: isVisible ? `${skill.initial * 20}%` : '0%'
                      }}
                    ></div>
                    <div 
                      className="skill-progress-bar final" 
                      style={{ 
                        width: isVisible ? `${skill.final * 20}%` : '0%'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="skill-details">
                  <div className="skill-level">Initial: {skill.initial}/5</div>
                  <div className="skill-level">Final: {skill.final}/5</div>
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
          <h2>SOFT SKILLS</h2>
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
                  '--soft-skill-color': skill.color,
                  '--soft-skill-rgb': skill.rgb,
                  '--rating-percent': skill.percent,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="skill-rating-circle">
                  <div className="circle-inner">
                    <span>{skill.rating}</span>
                  </div>
                </div>
                <h3>{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* The Shaper Review */}
        <div className={`shaper-review-section ${isVisible ? 'animate' : ''}`}>
          <h2>THE SHAPER REVIEW</h2>
          <div className="review-content">
            <p>He is a detail-oriented Full Stack developer who consistently delivers high-quality work. His clear communication and adaptability make him a valuable part of any development team.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
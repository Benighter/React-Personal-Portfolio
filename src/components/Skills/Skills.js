import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Skills.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faJava, 
  faDocker, 
  faFigma, 
  faJs, 
  faHtml5, 
  faCss3Alt, 
  faReact, 
  faAngular, 
  faGitAlt
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faServer } from '@fortawesome/free-solid-svg-icons';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef(null);
  const titleRef = useRef(null);

  // Application & Tool Knowledge
  const toolKnowledge = useMemo(() => [
    { name: 'Angular', color: '#DD0031', rgb: '221, 0, 49', icon: faAngular },
    { name: 'JavaScript', color: '#F7DF1E', rgb: '247, 223, 30', icon: faJs },
    { name: 'TypeScript', color: '#3178C6', rgb: '49, 120, 198', customIcon: 'TS' },
    { name: 'Java', color: '#007396', rgb: '0, 115, 150', icon: faJava },
    { name: 'PostgreSQL', color: '#336791', rgb: '51, 103, 145', icon: faDatabase },
    { name: 'Spring Boot', color: '#6DB33F', rgb: '109, 179, 63', icon: faServer },
    { name: 'CSS', color: '#1572B6', rgb: '21, 114, 182', icon: faCss3Alt },
    { name: 'HTML', color: '#E34F26', rgb: '227, 79, 38', icon: faHtml5 },
    { name: 'Git', color: '#F05032', rgb: '240, 80, 50', icon: faGitAlt },
    { name: 'Docker', color: '#2496ED', rgb: '36, 150, 237', icon: faDocker },
    { name: 'Figma', color: '#F24E1E', rgb: '242, 78, 30', icon: faFigma },
    { name: 'React', color: '#61DAFB', rgb: '97, 218, 251', icon: faReact }
  ], []);

  // Soft Skills
  const softSkills = useMemo(() => [
    { name: 'Problem Solving', color: '#FF6B6B', rgb: '255, 107, 107' },
    { name: 'Interpersonal Skills', color: '#FF6B6B', rgb: '255, 107, 107' },
    { name: 'Leadership Skills', color: '#FF6B6B', rgb: '255, 107, 107' },
    { name: 'Team Player Skills', color: '#FF6B6B', rgb: '255, 107, 107' },
    { name: 'Communication', color: '#FF6B6B', rgb: '255, 107, 107' }
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

    // Store the current value of the ref
    const currentRef = skillsRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
                {tool.icon ? (
                  <span className="tool-with-icon">
                    <FontAwesomeIcon icon={tool.icon} className="tool-icon" />
                    <span className="tool-name">{tool.name}</span>
                  </span>
                ) : tool.customIcon ? (
                  <span className="tool-with-icon">
                    <span className="custom-icon" style={{ backgroundColor: tool.color }}>{tool.customIcon}</span>
                    <span className="tool-name">{tool.name}</span>
                  </span>
                ) : (
                  <span>{tool.name}</span>
                )}
              </div>
            ))}
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
                  animationDelay: `${index * 0.1}s`
                }}
              >
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
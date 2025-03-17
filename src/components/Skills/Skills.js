import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
    { name: 'Overall Rating', initial: 1.5, final: 3.8 },
    { name: 'Angular', initial: 1.2, final: 3.7 },
    { name: 'HTML & CSS', initial: 1.3, final: 4.5 },
    { name: 'Java Spring Boot', initial: 1.2, final: 3.6 },
    { name: 'PostgreSQL', initial: 1.5, final: 4.3 },
    { name: 'Git', initial: 1.7, final: 3.5 }
  ], []);

  // Soft Skills
  const softSkills = useMemo(() => [
    { name: 'Problem Solving', rating: '4/5' },
    { name: 'Interpersonal Skills', rating: '3/5' },
    { name: 'Leadership Skills', rating: '3/5' },
    { name: 'Team Player Skills', rating: '4/5' },
    { name: 'Communication', rating: '3/5' }
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

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  // Animation for bars
  useEffect(() => {
    if (isVisible) {
      const bars = document.querySelectorAll('.skill-progress-bar');
      bars.forEach((bar) => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }
  }, [isVisible]);

  return (
    <section id="skills" ref={skillsRef}>
      <div className="skills container">
        {/* Application & Tool Knowledge */}
        <div className="tool-knowledge-section">
          <h1 className="section-title">Application & <span>Tool Knowledge</span></h1>
          <div className="tool-knowledge-container">
            {toolKnowledge.map((tool, index) => (
              <div className="tool-item" key={index} style={{ borderColor: tool.color }}>
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="technical-skills-section">
          <h1 className="section-title">Technical <span>Skills</span></h1>
          <div className="technical-skills-container">
            {technicalSkills.map((skill, index) => (
              <div className="technical-skill-item" key={index}>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar-container">
                  <div className="skill-bar-background">
                    <div 
                      className="skill-progress-bar initial" 
                      style={{ width: isVisible ? `${skill.initial * 20}%` : '0%' }}
                      data-width={`${skill.initial * 20}%`}
                    ></div>
                    <div 
                      className="skill-progress-bar final" 
                      style={{ width: isVisible ? `${skill.final * 20}%` : '0%' }}
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
        <div className="soft-skills-section">
          <h1 className="section-title">Soft <span>Skills</span></h1>
          <div className="soft-skills-container">
            <div className="most-improved">
              <h3>Most Improved Skill:</h3>
              <h2>Team Player</h2>
            </div>
            {softSkills.map((skill, index) => (
              <div className="soft-skill-item" key={index}>
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

        {/* Shaper Review */}
        <div className="shaper-review-section">
          <h1 className="section-title">The Shaper <span>Review</span></h1>
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
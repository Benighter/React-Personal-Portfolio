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
import { faDatabase, faServer, faList, faChartPie, faEye, faAngleRight, faAngleLeft, faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewType, setViewType] = useState('list'); // 'list' or 'radar'
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [animateMeters, setAnimateMeters] = useState(false);
  const skillsRef = useRef(null);
  const titleRef = useRef(null);
  const radarRef = useRef(null);
  const chartRef = useRef(null);

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

  // Technical Skills with initial and final assessment values
  const technicalSkills = useMemo(() => [
    { name: 'Overall Rating', initial: 1.5, final: 3.8, color: '#00BFFF', rgb: '0, 191, 255', description: 'General proficiency across all technical domains' },
    { name: 'Angular', initial: 1.2, final: 3.7, color: '#DD0031', rgb: '221, 0, 49', description: 'Component-based architecture, services, and state management' },
    { name: 'HTML & CSS', initial: 1.3, final: 4.5, color: '#E34F26', rgb: '227, 79, 38', description: 'Modern layouts, responsive design, and animations' },
    { name: 'Java Spring Boot', initial: 1.2, final: 3, color: '#6DB33F', rgb: '109, 179, 63', description: 'RESTful API development and microservices' },
    { name: 'TypeScript', initial: 1.4, final: 3.9, color: '#3178C6', rgb: '49, 120, 198', description: 'Strong typing, interfaces, and advanced features' },
    { name: 'PostgreSQL', initial: 1.5, final: 4.3, color: '#336791', rgb: '51, 103, 145', description: 'Complex queries, stored procedures, and optimization' },
    { name: 'Git', initial: 1.7, final: 3.5, color: '#F05032', rgb: '240, 80, 50', description: 'Version control, branching strategies, and collaboration' },
    { name: 'Docker', initial: 1.3, final: 3.4, color: '#2496ED', rgb: '36, 150, 237', description: 'Containerization, deployment, and orchestration' },
    { name: 'React', initial: 1.2, final: 3.3, color: '#61DAFB', rgb: '97, 218, 251', description: 'Component lifecycle, hooks, and state management' }
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

  // Prepare radar chart data
  const radarData = {
    labels: technicalSkills.map(skill => skill.name),
    datasets: [
      {
        label: 'Initial Skills',
        data: technicalSkills.map(skill => skill.initial),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Current Skills',
        data: technicalSkills.map(skill => skill.final),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  // Add click event handler to radar chart
  useEffect(() => {
    if (viewType === 'radar' && chartRef.current) {
      const handleClick = (event) => {
        const chart = chartRef.current;
        const activePoints = chart.getElementsAtEventForMode(
          event,
          'nearest',
          { intersect: true },
          false
        );
        
        if (activePoints.length > 0) {
          const clickedIndex = activePoints[0].index;
          setSelectedSkill(clickedIndex);
        }
      };
      
      const canvas = radarRef.current.querySelector('canvas');
      if (canvas) {
        canvas.addEventListener('click', handleClick);
        return () => {
          canvas.removeEventListener('click', handleClick);
        };
      }
    }
  }, [viewType, radarRef, chartRef]);

  // Update radar options to get chart instance
  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: "'Poppins', sans-serif",
          },
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
          stepSize: 1,
          max: 5,
          min: 0,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            family: "'Poppins', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}/5`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedSkill(index);
      }
    }
  };

  // Add pulse animation to the selected point in the radar chart
  useEffect(() => {
    if (selectedSkill !== null && viewType === 'radar' && chartRef.current) {
      // Add highlight effect to selected point
      const meta = chartRef.current.getDatasetMeta(1); // Current skills dataset
      if (meta && meta.data && meta.data[selectedSkill]) {
        // Apply pulse animation to the selected point
        const pointEl = meta.data[selectedSkill];
        const originalRadius = pointEl.options.radius || 3;
        
        let animationFrame;
        let scale = 1;
        let increasing = true;
        
        const animatePulse = () => {
          if (increasing) {
            scale += 0.03;
            if (scale >= 1.5) increasing = false;
          } else {
            scale -= 0.03;
            if (scale <= 1) increasing = true;
          }
          
          pointEl.options.radius = originalRadius * scale;
          chartRef.current.update();
          animationFrame = requestAnimationFrame(animatePulse);
        };
        
        animatePulse();
        
        return () => {
          cancelAnimationFrame(animationFrame);
          if (pointEl) {
            pointEl.options.radius = originalRadius;
            chartRef.current.update();
          }
        };
      }
    }
  }, [selectedSkill, viewType]);

  // Reset animation when skill changes
  useEffect(() => {
    if (selectedSkill !== null) {
      setAnimateMeters(false);
      const timer = setTimeout(() => {
        setAnimateMeters(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedSkill]);

  const toggleView = () => {
    setViewType(prev => prev === 'list' ? 'radar' : 'list');
  };

  const handleSkillClick = (index) => {
    setSelectedSkill(selectedSkill === index ? null : index);
  };

  const handlePrevSkill = () => {
    setSelectedSkill(prev => (prev === null || prev === 0) ? technicalSkills.length - 1 : prev - 1);
  };

  const handleNextSkill = () => {
    setSelectedSkill(prev => (prev === null || prev === technicalSkills.length - 1) ? 0 : prev + 1);
  };

  // Toggle collapse state of the radar skill detail
  const toggleCollapse = (e) => {
    e.stopPropagation();
    setIsCollapsed(prev => !prev);
  };

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

        {/* Technical Skills */}
        <div className={`technical-skills-section ${isVisible ? 'animate' : ''}`}>
          <h2>TECHNICAL SKILLS</h2>
          
          <div className="view-toggle-container">
            <button 
              className={`view-toggle-btn ${viewType === 'list' ? 'active' : ''}`} 
              onClick={() => setViewType('list')}
              aria-label="List View"
            >
              <FontAwesomeIcon icon={faList} /> List View
            </button>
            <button 
              className={`view-toggle-btn ${viewType === 'radar' ? 'active' : ''}`} 
              onClick={() => setViewType('radar')}
              aria-label="Radar View"
            >
              <FontAwesomeIcon icon={faChartPie} /> Radar View
            </button>
          </div>
          
          {viewType === 'list' ? (
            <div className="technical-skills-list-container">
              {technicalSkills.map((skill, index) => (
                <div 
                  className={`technical-skill-item ${selectedSkill === index ? 'expanded' : ''}`} 
                  key={index}
                  style={{ 
                    '--skill-color': skill.color,
                    '--skill-rgb': skill.rgb,
                    animationDelay: `${index * 0.1}s`
                  }}
                  onClick={() => handleSkillClick(index)}
                >
                  <div className="skill-header">
                    <div className="skill-name">{skill.name}</div>
                    <button className="skill-expand-btn" aria-label={selectedSkill === index ? "Collapse" : "Expand"}>
                      <FontAwesomeIcon icon={faEye} />
                    </button>
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
                  
                  {selectedSkill === index && (
                    <div className="skill-description">
                      <p style={{ color: '#ffffff' }}>{skill.description}</p>
                      <div className="skill-growth">
                        <span className="growth-label">Growth:</span>
                        <span className="growth-value">{((skill.final - skill.initial) / skill.initial * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
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
          ) : (
            <div className="technical-skills-radar-container">
              <div className="radar-chart-wrapper">
                <div className="radar-chart" ref={radarRef}>
                  <Radar 
                    data={radarData} 
                    options={radarOptions} 
                    ref={chartRef}
                  />
                </div>
              </div>
              
              <div className="radar-skill-detail">
                {selectedSkill !== null ? (
                  <div className={`radar-skill-card ${isCollapsed ? 'collapsed' : ''} ${animateMeters ? 'radar-skill-card-update' : ''}`}>
                    <button 
                      className="skill-collapse-btn" 
                      onClick={toggleCollapse}
                      aria-label={isCollapsed ? "Expand skill details" : "Collapse skill details"}
                    >
                      <FontAwesomeIcon icon={isCollapsed ? faPlus : faMinus} />
                    </button>
                    <button 
                      className="radar-back-btn" 
                      onClick={() => setSelectedSkill(null)}
                      aria-label="Return to skill selection"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className="radar-nav-buttons">
                      <button onClick={handlePrevSkill} className="radar-nav-btn">
                        <FontAwesomeIcon icon={faAngleLeft} />
                      </button>
                      <button onClick={handleNextSkill} className="radar-nav-btn">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </button>
                    </div>
                    <h3 style={{ 
                      color: technicalSkills[selectedSkill].color,
                      '--skill-rgb': technicalSkills[selectedSkill].rgb,
                    }}>
                      {technicalSkills[selectedSkill].name}
                    </h3>
                    <div className="radar-skill-meters">
                      <h4 className="meter-section-title">Skill Progress</h4>
                      <div className="radar-skill-meter">
                        <span>Initial</span>
                        <div className="meter-bar">
                          <div 
                            className={`meter-fill initial ${animateMeters ? 'animated' : ''}`}
                            style={{ 
                              '--final-width': `${technicalSkills[selectedSkill].initial * 20}%`,
                              width: animateMeters ? `${technicalSkills[selectedSkill].initial * 20}%` : '0%'
                            }}
                          ></div>
                        </div>
                        <span>{technicalSkills[selectedSkill].initial}/5</span>
                      </div>
                      <div className="radar-skill-meter">
                        <span>Current</span>
                        <div className="meter-bar">
                          <div 
                            className={`meter-fill final ${animateMeters ? 'animated' : ''}`}
                            style={{ 
                              '--final-width': `${technicalSkills[selectedSkill].final * 20}%`,
                              width: animateMeters ? `${technicalSkills[selectedSkill].final * 20}%` : '0%'
                            }}
                          ></div>
                        </div>
                        <span>{technicalSkills[selectedSkill].final}/5</span>
                      </div>
                    </div>
                    <p className="radar-skill-description" style={{ color: '#ffffff' }}>
                      {technicalSkills[selectedSkill].description}
                    </p>
                    <div className="radar-skill-growth">
                      <span>Growth:</span>
                      <span className="growth-number">
                        {((technicalSkills[selectedSkill].final - technicalSkills[selectedSkill].initial) / technicalSkills[selectedSkill].initial * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="radar-instructions">
                    <p style={{ color: '#ffffff' }}>Click on any point in the radar chart to see detailed information about that skill.</p>
                    <div className="radar-quick-select">
                      {technicalSkills.map((skill, index) => (
                        <button 
                          key={index} 
                          className="radar-select-btn"
                          style={{ 
                            backgroundColor: skill.color,
                            '--btn-rgb': skill.rgb,
                            '--index': index
                          }}
                          onClick={() => setSelectedSkill(index)}
                        >
                          {skill.name.substring(0, 2)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
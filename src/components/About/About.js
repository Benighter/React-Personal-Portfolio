import React from 'react';
import './About.css';
import blenderImage from '../../assets/img/img-2.png';

const About = () => {
  return (
    <section id="about">
      <div className="about container">
        <div className="col-left">
          <div className="about-img">
            <img src={blenderImage} alt="About Me" />
          </div>
        </div>
        <div className="col-right">
          <h1 className="section-title">About <span>Me</span></h1>
          <h2 className="job-title">Full Stack Developer & 3D Designer</h2>
          <p className="about-text">
            I'm a passionate Full Stack Developer with expertise in both front-end and back-end technologies. 
            I specialize in creating responsive, user-friendly web applications using modern frameworks and libraries.
            With a strong foundation in JavaScript, React, Node.js, and Python, I build scalable and efficient solutions 
            for complex problems.
          </p>
          <p className="about-text">
            Beyond web development, I'm also skilled in 3D design using Blender, creating immersive visual experiences 
            and assets for various applications. My background in teaching (TEFL certified) has enhanced my communication 
            skills and ability to explain complex concepts in simple terms.
          </p>
          <p className="about-text">
            I'm constantly learning and exploring new technologies to stay at the forefront of the rapidly evolving 
            tech landscape. I'm passionate about creating clean, efficient code and delivering high-quality products 
            that exceed client expectations.
          </p>
          <a href="/Resume/My Resume.pdf" className="cta" target="_blank" rel="noopener noreferrer">Download Resume</a>
        </div>
      </div>
    </section>
  );
};

export default About; 
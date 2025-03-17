import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const nameRef = useRef(null);
  const helloRef = useRef(null);
  const myNameRef = useRef(null);

  useEffect(() => {
    // Animate text reveal
    const animateText = (element, delay) => {
      setTimeout(() => {
        if (element.current) {
          element.current.classList.add('animate');
        }
      }, delay);
    };

    animateText(helloRef, 500);
    animateText(myNameRef, 1500);
    animateText(nameRef, 2500);
  }, []);

  return (
    <section id="hero">
      <div className="hero container">
        <div>
          <h1 ref={helloRef}>Hello, <span></span></h1>
          <h1 ref={myNameRef}>My Name is <span></span></h1>
          <h1 ref={nameRef}>Bennet <span></span></h1>
          <a href="#projects" type="button" className="cta">Projects</a>
        </div>
      </div>
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </section>
  );
};

export default Hero; 
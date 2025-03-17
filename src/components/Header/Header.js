import React, { useState, useEffect, useCallback } from 'react';
import './Header.css';

const Header = () => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Throttle function to limit how often the scroll handler fires
  const throttle = (callback, delay) => {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  // Memoize the scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 250) {
      setHeaderBackground(true);
    } else {
      setHeaderBackground(false);
    }
    
    // Determine which section is currently in view
    const sections = ['hero', 'services', 'projects', 'skills', 'about', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        // If the section is in the viewport (with some buffer for better UX)
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    // Check if there's a hash in the URL on initial load
    const hash = window.location.hash;
    if (hash) {
      const section = hash.substring(1); // Remove the # character
      if (document.getElementById(section)) {
        setActiveSection(section);
      }
    }
    
    // Apply throttling to the scroll handler (100ms)
    const throttledScrollHandler = throttle(handleScroll, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [handleScroll]);

  const toggleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };

  const handleNavClick = (e) => {
    // Get the section ID from the href attribute
    const sectionId = e.currentTarget.getAttribute('href').substring(1);
    setActiveSection(sectionId);
    
    if (hamburgerActive) {
      setHamburgerActive(false);
    }
  };

  return (
    <section id="header">
      <div className={`header container ${headerBackground ? 'solid-header' : ''}`}>
        <div className="nav-bar">
          <div className="brand">
            <a href="#hero" onClick={(e) => handleNavClick(e)}>
              <h1><span>B</span>ennet <span>N</span>kolele</h1>
            </a>
          </div>
          <div className="nav-list">
            <div 
              className={`hamburger ${hamburgerActive ? 'active' : ''}`} 
              onClick={toggleHamburger}
            >
              <div className="bar"></div>
            </div>
            <ul className={hamburgerActive ? 'active' : ''}>
              <li><a href="#hero" data-after="Home" onClick={handleNavClick} className={activeSection === 'hero' ? 'active' : ''}>Home</a></li>
              <li><a href="#services" data-after="Service" onClick={handleNavClick} className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
              <li><a href="#projects" data-after="Projects" onClick={handleNavClick} className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
              <li><a href="#skills" data-after="Skills" onClick={handleNavClick} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
              <li><a href="#about" data-after="About" onClick={handleNavClick} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
              <li><a href="#contact" data-after="Contact" onClick={handleNavClick} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header; 
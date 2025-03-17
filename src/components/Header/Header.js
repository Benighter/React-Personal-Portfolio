import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 250) {
        setHeaderBackground(true);
      } else {
        setHeaderBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleHamburger = () => {
    setHamburgerActive(!hamburgerActive);
  };

  const handleNavClick = () => {
    if (hamburgerActive) {
      setHamburgerActive(false);
    }
  };

  return (
    <section id="header">
      <div className={`header container ${headerBackground ? 'solid-header' : ''}`}>
        <div className="nav-bar">
          <div className="brand">
            <a href="#hero">
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
              <li><a href="#hero" data-after="Home" onClick={handleNavClick}>Home</a></li>
              <li><a href="#services" data-after="Service" onClick={handleNavClick}>Services</a></li>
              <li><a href="#projects" data-after="Projects" onClick={handleNavClick}>Projects</a></li>
              <li><a href="#skills" data-after="Skills" onClick={handleNavClick}>Skills</a></li>
              <li><a href="#about" data-after="About" onClick={handleNavClick}>About</a></li>
              <li><a href="#contact" data-after="Contact" onClick={handleNavClick}>Contact</a></li>
              <li>
                <button 
                  id="darkModeToggle" 
                  aria-label="Toggle dark mode"
                  onClick={toggleDarkMode}
                >
                  <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header; 
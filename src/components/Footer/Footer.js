import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="footer">
      <div className="footer container">
        <div className="brand">
          <h1><span>B</span>ennet <span>N</span>kolele</h1>
        </div>
        <h2>Your Complete Web Solution</h2>
        <div className="social-icons">
          <a href="https://github.com/Benighter/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
          <a href="https://www.linkedin.com/in/bennet-nkolele-321285249/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
        <p>&copy; {currentYear} Bennet Nkolele. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer; 
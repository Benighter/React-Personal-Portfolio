import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faPaperPlane, 
  faUser, 
  faComment 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedinIn, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(contactRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
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
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, [isVisible]);

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }

  const contactItems = [
    {
      icon: faPhone,
      title: 'Phone',
      info: '+27 81 090 3232',
      link: 'tel:+27810903232'
    },
    {
      icon: faEnvelope,
      title: 'Email',
      info: 'bennet.nkolele1998@gmail.com',
      link: 'mailto:bennet.nkolele1998@gmail.com'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Address',
      info: 'Johannesburg, South Africa',
      link: 'https://maps.google.com/?q=Johannesburg,South+Africa'
    }
  ];

  const socialLinks = [
    { icon: faGithub, url: 'https://github.com/' },
    { icon: faLinkedinIn, url: 'https://linkedin.com/' },
    { icon: faTwitter, url: 'https://twitter.com/' },
    { icon: faInstagram, url: 'https://instagram.com/' }
  ];

  return (
    <section id="contact" ref={contactRef}>
      <div className="contact-background"></div>
      <div className="contact container">
        <div className={`contact-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Contact</h1>
          <div className="title-underline"></div>
        </div>
        
        <div className="contact-content">
          <div className={`contact-info ${isVisible ? 'animate' : ''}`}>
            <h2 className="contact-info-title">Get In Touch</h2>
            
            {contactItems.map((item, index) => (
              <div 
                className="contact-item" 
                key={index}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="contact-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <div className="contact-details">
                  <h3 className="contact-item-title">{item.title}</h3>
                  <p className="contact-item-info">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.info}
                      </a>
                    ) : (
                      item.info
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`contact-form-container ${isVisible ? 'animate' : ''}`}>
            <div className="contact-form">
              <h2 className="form-title">Send Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className={`social-links ${isVisible ? 'animate' : ''}`}>
          {socialLinks.map((link, index) => (
            <a 
              href={link.url} 
              className="social-link" 
              key={index}
              target="_blank" 
              rel="noopener noreferrer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact; 
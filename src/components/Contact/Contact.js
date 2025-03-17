import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      color: '#e74c3c'
    },
    {
      icon: faEnvelope,
      title: 'Email',
      info: 'bennet.nkolele1998@gmail.com',
      color: '#3498db'
    },
    {
      icon: faMapMarkerAlt,
      title: 'Address',
      info: 'Johannesburg, South Africa',
      color: '#2ecc71'
    }
  ];

  return (
    <section id="contact" ref={contactRef}>
      <div className="contact-background"></div>
      <div className="contact container">
        <div className={`contact-header ${isVisible ? 'animate' : ''}`}>
          <h1 className="section-title" ref={titleRef}>Contact</h1>
          <div className="title-underline"></div>
        </div>
        <p className={`contact-description ${isVisible ? 'animate' : ''}`}>
          Feel free to reach out to me through any of the following channels or use the contact form below.
        </p>
        <div className={`contact-content ${isVisible ? 'animate' : ''}`}>
          <div className="contact-info-container">
            {contactItems.map((item, index) => (
              <div 
                className="contact-item" 
                key={index}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  borderTop: `4px solid ${item.color}`
                }}
              >
                <div 
                  className="icon"
                  style={{ background: `rgba(${hexToRgb(item.color)}, 0.1)` }}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    style={{ color: item.color }}
                  />
                </div>
                <div className="contact-info">
                  <h2>{item.title}</h2>
                  <p>{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 
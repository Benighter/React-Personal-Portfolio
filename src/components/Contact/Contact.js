import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { 

} from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);
  const titleRef = useRef(null);


  useEffect(() => {
    const currentRef = contactRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

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
          
        </div>
      

      </div>
    </section>
  );
};

export default Contact; 
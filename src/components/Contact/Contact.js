import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
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
    // In a real application, you would send the form data to a server
    // For this demo, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <section id="contact">
      <div className="contact container">
        <div>
          <h1 className="section-title">Contact <span>Info</span></h1>
        </div>
        <div className="contact-items">
          <div className="contact-item">
            <div className="icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="contact-info">
              <h1>Phone</h1>
              <h2>+27 81 090 3232 </h2>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="contact-info">
              <h1>Email</h1>
              <h2>bennet.nkolele1998@gmail.com</h2>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="contact-info">
              <h1>Address</h1>
              <h2>Johannesburg, South Africa</h2>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Contact; 
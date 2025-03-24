import React, { useState, useEffect } from 'react';
import './ContactModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faUser, 
  faEnvelope, 
  faComment, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';

const ContactModal = ({ isOpen, onClose }) => {
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Slight delay to allow animation to work properly
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formDataToSend = new FormData(event.target);

    formDataToSend.append("access_key", "dbac2710-a749-42ae-8ee6-1fcf1f70fb53");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
          setResult("");
        }, 3000);
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Failed to send message. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isVisible ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>Let's Work Together</h2>
            <div className="title-underline"></div>
          </div>
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-intro">
            I'm excited to hear about your project! Fill out the form below and I'll get back to you as soon as possible.
          </p>

          <form onSubmit={onSubmit}>
            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
              <div className="input-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="input-container">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
              <div className="input-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="input-container">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
              <div className="input-icon textarea-icon">
                <FontAwesomeIcon icon={faComment} />
              </div>
              <div className="input-container">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell me about your project or opportunity" 
                  rows="5" 
                  required 
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Send Message <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
          
          {result && (
            <div className={`form-result ${result.includes('success') ? 'success' : 'error'}`}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal; 
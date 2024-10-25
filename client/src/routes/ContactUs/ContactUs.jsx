import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info">
        <p>Get in touch with us through WhatsApp or call us directly:</p>
        <div className="contact-methods">
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="contact-item">
            <img src="/whatsapp-icon.png" alt="WhatsApp" className="icon" /> WhatsApp Us
          </a>
          <a href="tel:+91-8790610105" className="contact-item">
            <img src="/phone-icon.png" alt="Phone" className="icon" /> Call Us: +91-8790610105
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

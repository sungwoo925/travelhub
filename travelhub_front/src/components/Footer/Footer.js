import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './Footer.css';

const Footer = () => {
  const location = useLocation(); 

  let className; 
  if (location.pathname === '/login' || location.pathname === '/register') {
    className = 'footer-login';
  } else {
    className = 'footer-default';
  }
  
  return (
    <footer className={className}>
      <div className="footer-content">
        <h4>Contact Us</h4>
        <p>dnrals7929@naver.com</p>
        <p>qkrtjddn5807@gmail.com</p>
        <p>cks71714@naver.com</p>
      </div>
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
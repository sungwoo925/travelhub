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
      <p>qkrtjddn5807@gmail.com</p>
      <p>cks71714@naver.com </p>

    </footer>
  );
};

export default Footer;

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
  const backgroundImage = process.env.PUBLIC_URL + '/images/background1.jpg';

  return (
    <footer className={className}>
      <p>qkrtjddn5807@gmail.com</p>
      <p>cks71714@naver.com </p>
      {(location.pathname === '/login' || location.pathname === '/register')&& <div style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%', // 배경 이미지가 차지할 높이를 조정합니다.
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}></div>}
    </footer>
  );
};

export default Footer;

import React from 'react';

const Background = () => {
  const backgroundImage = process.env.PUBLIC_URL + '/images/background1.jpg';
  return (
    <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%', // 배경 이미지가 차지할 높이를 조정합니다.
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}></div>
  );
};

export default Background;

// const backgroundImage = process.env.PUBLIC_URL + '/images/background1.jpg';

// {(location.pathname === '/login' || location.pathname === '/register')&& <div style={{
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   height: '100%', // 배경 이미지가 차지할 높이를 조정합니다.
//   width: '100%',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   zIndex: -1,
// }}></div>}
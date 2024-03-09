import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="navbar">
      <Link to="/">이웃스토리</Link>
      <Link to="/about">이용방법</Link>
      <Link to="/record">기록하기</Link>
      <Link to="/login" className='login'>로그인</Link>
      <Link to="/register" className='register'>회원가입</Link>
    </div>
  );
};

export default Header;

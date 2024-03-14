import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
//cabed8da4b2445c6972f2872a1f7d3ea 카카오 js key
function Login() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">ID:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className="Login-btn">Login</button>
      </form>
      <div className="login-options">
        <p>다른 계정으로 로그인 하시겠습니까?</p>
        <div>
          <button className="google-btn"><span className="icon-google"></span>구글로 로그인하기</button>
          <button className="kakao-btn"><span className="icon-kakao"></span>카카오로 로그인하기</button>
        </div>
        <div className="signup-link">
        <p>회원이 아니신가요? <Link to="/register">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

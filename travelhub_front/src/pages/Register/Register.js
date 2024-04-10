import React from 'react';
import './Register.css'; // register에 필요한 CSS 파일
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register-container">
      <div style={{
          backgroundImage: `url('../../../public/images/background1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%', // 배경 이미지가 차지할 높이를 조정합니다.
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}></div>
      <h2>회원가입</h2>
      <form className="register-form">
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="username" name="username" placeholder="ID" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="password" name="password" placeholder="Password" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="tel" id="phone" name="phone" placeholder="Phone" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="name" name="name" placeholder="Name" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="date" id="birthdate" name="birthdate" placeholder="Birthdate" />
          </div>
        </div>
        <div className="form-group">
          <div className="gender-options">
            <label htmlFor="male">
              <input type="checkbox" id="male" name="gender" value="male" /> 남자
            </label>
            <label htmlFor="female">
              <input type="checkbox" id="female" name="gender" value="female" /> 여자
            </label>
          </div>
        </div>
        <button className="Register-btn">Register</button>
      </form>
      <div className="login-options">
        <p>다른 계정으로 로그인 하시겠습니까?</p>
        <div>
          <button className="google-btn">
            <img src="./images/googleicon.png" className="google-icon" alt="google icon" />
          </button>
          <button className="kakao-btn">
            <img src="./images/kakaoicon.png" className="kakao-icon" alt="Kakao icon" />
          </button>
        </div>
        <div className="signup-link">
          <p>이미 회원이신가요? <Link to="/login">로그인 하러가기</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;

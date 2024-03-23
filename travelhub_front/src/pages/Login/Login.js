import React, { useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
//cabed8da4b2445c6972f2872a1f7d3ea 카카오 js key

function Login() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      window.Kakao.init("cabed8da4b2445c6972f2872a1f7d3ea");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: 'profile_nickname, profile_image, account_email',
      success: function(authObj) {
        console.log(authObj);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function(response) {
            console.log(response);
            // 가져온 사용자 정보를 이용한 추가 작업 수행
          },
          fail: function(error) {
            console.error(error);
          }
        });
      },
      fail: function(err) {
        console.error(err);
      },
    });
  };
  

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
          <button className="google-btn">
            <img src="./images/googleicon.png" className="google-icon" alt="google icon" />
          </button>
          <button className="kakao-btn" onClick={handleKakaoLogin}>
            <img src="./images/kakaoicon.png" className="kakao-icon" alt="Kakao icon" />
          </button>
        </div>
        <div className="signup-link">
          <p>회원이 아니신가요? <Link to="/register">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

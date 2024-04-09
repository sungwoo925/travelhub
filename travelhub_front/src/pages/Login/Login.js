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
      <h2>로그인</h2>
      <form className="login-form">
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="username" name="username" placeholder="ID" />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="password" name="password" placeholder="password"/>
          </div>
        </div>
        <div className="form-group">
          <div className="login-info">
            <div className="login-info-remember">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">로그인 정보 저장</label>
            </div>
            <div className="find-links">
              <p><Link to="/find-id">아이디 찾기</Link> | <Link to="/find-password">비밀번호 찾기</Link></p>
            </div>
          </div>
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
          <p>회원이 아니신가요? <Link to="/register">지금 가입하세요!</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;

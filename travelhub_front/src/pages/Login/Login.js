import React, { useEffect, useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

function Login() {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
            login(); // 로그인 상태 업데이트  
            navigate('/'); // 로그인 성공 시 home으로 이동
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
  
  const handleLogin = async () => {
    try {
      console.log(useremail);
      console.log(password); 
      const response = await axios.post('http://localhost:9826/auth/login', {
        user_email: useremail,
        user_password: password
      });

      console.log('Login successful:', response.data);//이부분 삭제예정
      const jwtToken = response.data;
      Cookies.set('jwtToken', jwtToken, { expires: 7 });
      login(); // 로그인 상태 업데이트
      navigate('/'); // 로그인 성공 시 home으로 이동

    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="useremail" name="useremail" placeholder="Email" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
        <button type="submit" className="Login-btn">Login</button>
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

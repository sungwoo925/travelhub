import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // axios를 사용하여 서버와 통신

function Register() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    name: '',
    birthdate: '',
    gender: ''
  });
  const [message, setMessage] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUsernameCheck = async () => {
    try {
      const response = await axios.get(`http://your-api-url.com/checkUsername/${userData.username}`);
      if (response.data.isAvailable) {
        setMessage('사용 가능한 아이디입니다.');
        setUsernameValid(true);
      } else {
        setMessage('이미 사용 중인 아이디입니다.');
        setUsernameValid(false);
      }
    } catch (error) {
      setMessage('아이디 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValid) {
      setMessage('아이디 중복 확인이 필요합니다.');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (userData.password.length < 8 || userData.password.length > 20) {
      setMessage('비밀번호는 8자리 이상 20자리 이하로 설정해주세요.');
      return;
    }
    try {
      const response = await axios.post('http://your-api-url.com/register', userData);
      if (response.status === 200) {
        setMessage('회원가입이 완료되었습니다.');
      } else {
        setMessage('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      setMessage('서버 오류로 인해 회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className="register-container">
      <div style={{
          backgroundImage: `url('../../../public/images/background1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}></div>
      <h2>회원가입</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="username" name="username" placeholder="아이디" value={userData.username} onChange={handleChange} />
            <button type="button" onClick={handleUsernameCheck}>중복 확인</button>
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="password" name="password" placeholder="비밀번호" value={userData.password} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인" value={userData.confirmPassword} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="tel" id="phone" name="phone" placeholder="휴대폰 번호" value={userData.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="name" name="name" placeholder="이름" value={userData.name} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="date" id="birthdate" name="birthdate" placeholder="생년월일" value={userData.birthdate} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="gender-options">
            <label htmlFor="male">
              <input type="radio" id="male" name="gender" value="male" checked={userData.gender === 'male'} onChange={handleChange} /> 남자
            </label>
            <label htmlFor="female">
              <input type="radio" id="female" name="gender" value="female" checked={userData.gender === 'female'} onChange={handleChange} /> 여자
            </label>
          </div>
        </div>
        <button type="submit" className="Register-btn">Register</button>
      </form>
      {message && <div className="register-message">{message}</div>}
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

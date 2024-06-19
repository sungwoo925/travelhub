import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios를 사용하여 서버와 통신

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_name: '',
    user_password: '',
    confirmPassword: '',
    user_phone_num: '',
    name: '',
    birthday: '',
    sex: ''
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
      const response = await axios.post(`http://localhost:9826/auth/checkUsername/${userData.username}`);
      console.log(response);
      if (response.data.isAvailable) {
        setMessage('사용 가능한 아이디입니다.');
        setUsernameValid(true);
      } else {
        setMessage('이미 사용 중인 아이디입니다.');
        setUsernameValid(false);
      }
      console.log(usernameValid);
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
    if (userData.user_password !== userData.confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (userData.user_password.length < 8 || userData.user_password.length > 20) {
      setMessage('비밀번호는 8자리 이상 20자리 이하로 설정해주세요.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:9826/auth/register', userData);
      if (response.status === 200) {
        setMessage('회원가입이 완료되었습니다.');
        alert("회원가입이 완료되었습니다.");
        navigate('/login');
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
            <input type="text" id="user_name" name="user_name" placeholder="아이디" value={userData.user_name} onChange={handleChange} />
            <button type="button" onClick={handleUsernameCheck}>중복 확인</button>
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="user_password" name="user_password" placeholder="비밀번호" value={userData.user_password} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="비밀번호 확인" value={userData.confirmPassword} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="tel" id="user_phone_num" name="user_phone_num" placeholder="휴대폰 번호" value={userData.user_phone_num} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="text" id="name" name="name" placeholder="이름" value={userData.name} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="input-box">
            <input type="date" id="birthday" name="birthday" value={userData.birthday} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <div className="gender-options">
            <label htmlFor="male">
              <input type="radio" id="male" name="sex" value="M" checked={userData.sex === 'M'} onChange={handleChange} /> 남자
            </label>
            <label htmlFor="female">
              <input type="radio" id="female" name="sex" value="F" checked={userData.sex === 'F'} onChange={handleChange} /> 여자
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


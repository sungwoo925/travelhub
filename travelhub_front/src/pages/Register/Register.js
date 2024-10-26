import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 사용하여 서버와 통신
const apiUrl = process.env.REACT_APP_API_URL;

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_email: "",
    user_password: "",
    confirmPassword: "",
    user_phone_num: "",
    user_name: "",
    birthday: "",
    sex: "",
  });
  const [message, setMessage] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUsernameCheck = async () => {
    try {
      const response = await axios.post(
        `https://${apiUrl}/auth/checkUsername/${userData.user_email}`
      );
      console.log(response);
      if (response.data.isAvailable) {
        setMessage("사용 가능한 아이디입니다.");
        setUsernameValid(true);
      } else {
        setMessage("이미 사용 중인 아이디입니다.");
        setUsernameValid(false);
      }
    } catch (error) {
      setMessage("아이디 확인 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usernameValid) {
      setMessage("아이디 중복 확인이 필요합니다.");
      return;
    }
    if (userData.user_password !== userData.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (
      userData.user_password.length < 8 ||
      userData.user_password.length > 20
    ) {
      setMessage("비밀번호는 8자리 이상 20자리 이하로 설정해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        "https://"+apiUrl+"/auth/register",
        userData
      );
      if (response.status === 200) {
        setMessage("회원가입이 완료되었습니다.");
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      } else {
        setMessage("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      setMessage("서버 오류로 인해 회원가입에 실패하였습니다.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
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
      scope: "profile_nickname, profile_image, account_email",
      success: function (authObj) {
        console.log(authObj);
        getInfo();
      },
      fail: function (err) {
        console.error(err);
      },
    });
  };

  function getInfo() {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        console.log(res);
        var email = res.kakao_account.email;
        var gender = res.kakao_account.gender;
        var profile_nickname = res.kakao_account.profile.nickname;
        var profile_image = res.kakao_account.profile.thumbnail_image_url;

        console.log(email, gender, profile_nickname, profile_image);

        if (email) {
          // 여기에 카카오 로그인 후 처리 로직을 추가하세요
          alert("카카오 로그인 성공");
          // navigate('/'); // 필요한 경우 페이지 이동
        } else {
          alert("로그인에 실패했습니다. 이메일을 확인하세요.");
        }
      },
      fail: function (error) {
        alert(
          "카카오 로그인에 실패했습니다. 관리자에게 문의하세요." +
            JSON.stringify(error)
        );
      },
    });
  }

  return (
    <div className="register-layout-container">
      <div className="register-container">
        <h2>회원가입</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-box">
              <input
                type="text"
                id="user_email"
                name="user_email"
                placeholder="메일"
                value={userData.user_email}
                onChange={handleChange}
              />
              <button type="button" onClick={handleUsernameCheck}>
                중복 확인
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="password"
                id="user_password"
                name="user_password"
                placeholder="비밀번호"
                value={userData.user_password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="tel"
                id="user_phone_num"
                name="user_phone_num"
                placeholder="휴대폰 번호"
                value={userData.user_phone_num}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="text"
                id="user_name"
                name="user_name"
                placeholder="이름"
                value={userData.user_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={userData.birthday}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="gender-options">
              <label htmlFor="male">
                <input
                  type="radio"
                  id="male"
                  name="sex"
                  value="M"
                  checked={userData.sex === "M"}
                  onChange={handleChange}
                />{" "}
                남자
              </label>
              <label htmlFor="female">
                <input
                  type="radio"
                  id="female"
                  name="sex"
                  value="F"
                  checked={userData.sex === "F"}
                  onChange={handleChange}
                />{" "}
                여자
              </label>
            </div>
          </div>
          <button type="submit" className="Register-btn">
            Register
          </button>
        </form>
        {message && <div className="register-message">{message}</div>}
        <div className="login-options">
          <div className="sns-btn">
            <button
              className="google-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="./images/googleicon.png" alt="google icon" />
              <span style={{ marginLeft: "8px", color: "black" }}>
                google로 쉬운 시작
              </span>
            </button>
            <button
              className="kakao-btn"
              onClick={handleKakaoLogin}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="./images/kakao-button.png" alt="kakao" />
              <span style={{ marginLeft: "8px", color: "black" }}>
                카카오로 쉬운 시작
              </span>
            </button>
          </div>
          <div className="signup-link">
            <p>
              이미 회원이신가요? <Link to="/login">로그인 하러가기</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

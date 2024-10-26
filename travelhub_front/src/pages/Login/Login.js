import React, { useEffect, useState, useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

function Login() {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setUserInfo } = useContext(AuthContext); // setUserInfo 가져오기
  const navigate = useNavigate();

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
        getInfo(); // 사용자 정보 가져오기
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
          // 사용자 정보를 AuthContext에 저장
          setUserInfo({ email, gender, profile_nickname, profile_image });
          login(); // 로그인 상태 업데이트
          navigate("/"); // 마이페이지로 이동
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

  const handleLogin = async () => {
    try {
      console.log(useremail);
      console.log(password);
      const response = await axios.post(apiUrl+"/auth/login", {
        user_email: useremail,
        user_password: password,
      });

      console.log("Login successful:", response.data); //이부분 삭제예정
      const jwtToken = response.data;
      Cookies.set("jwtToken", jwtToken, { expires: 7 });
      login(); // 로그인 상태 업데이트
      navigate("/"); // 로그인 성공 시 home으로 이동
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="login-container">
      <div className="Login-form">
        <h2>로그인</h2>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="form-group">
            <div className="input-box">
              <input
                type="text"
                id="useremail"
                name="useremail"
                placeholder="Email"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-box">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="login-info">
              <div className="login-info-remember">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">로그인 정보 저장</label>
              </div>
              <div className="find-links">
                <p>
                  <Link to="/find-id">아이디 찾기</Link> |{" "}
                  <Link to="/find-password">비밀번호 찾기</Link>
                </p>
              </div>
            </div>
          </div>
          <button type="submit" className="Login-btn">
            Login
          </button>
        </form>
        <div className="login-options">
          <p>다른 계정으로 로그인 하시겠습니까?</p>
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
              회원이 아니신가요? <Link to="/register">지금 가입하세요!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

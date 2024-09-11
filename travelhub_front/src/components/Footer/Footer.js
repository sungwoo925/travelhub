import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  let className;
  if (location.pathname === "/login" || location.pathname === "/register") {
    className = "footer-login";
  } else {
    className = "footer-default";
  }

  return (
    <div className={`footer ${className}`}>
      <div className="footer-inner">
        <div className="footer-logo"></div>

        <div className="info-area">
          <ul className="info-list">
            <li className="info-item">(주)웅진컴퍼스</li>
            <li className="info-item">대표 : 서종윤</li>
            <li className="info-item">사업자 등록번호 : 214-87-35792</li>
            <li className="info-item">
              통신판매신고 : 제 2005-서울서초-05631호
            </li>
          </ul>
          <ul className="info-list">
            <li className="info-item">
              주소 : 서울시 서초구 강남대로 39길 15-10 한라비발디스튜디오 193,
              3층
            </li>
            <li className="info-item">전화번호 : 02-3471-0013</li>
          </ul>
        </div>
        <div className="copyright">
          © woongjin compass. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;

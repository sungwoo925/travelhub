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
    <div className={`footer footer-login`}>
      <div className="footer-inner">
        <img
          className="footer-logo"
          src="./images/footer-logo-removebg-preview.png"
        ></img>

        <div className="info-area">
          <ul className="info-list">
            <li className="info-item">담당교수 : 김숙연</li>
            <li className="info-item">팀원 : 한민욱, 박성우, 차기석 </li>
            <li className="info-item">여행담은스토리</li>
            <li className="info-item">2024 캡스톤 디자인</li>
          </ul>
          <ul className="info-list">
            <li className="info-item">
              나의 여행을 담을 수 있는 3D전시관 제작
            </li>
            <li className="info-item">전화번호 : 031-1234-5678</li>
          </ul>
        </div>
        <div className="copyright">
          Creating a 3D exhibition hall that can contain my travels
        </div>
      </div>
    </div>
  );
};

export default Footer;

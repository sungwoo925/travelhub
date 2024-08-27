import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  
  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    // 카카오 로그아웃 호출
    window.Kakao.Auth.logout(() => {
        setIsAuthenticated(false);
        setUserInfo(null); // 사용자 정보 초기화
        localStorage.removeItem('kakaoToken'); // 카카오 토큰 삭제
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
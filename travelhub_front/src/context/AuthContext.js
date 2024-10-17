import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null); // 초기값이 null
    const [jwtToken, setJwtToken] = useState(null); // JWT 토큰 상태 추가

    const login = (token, user) => {
        setIsAuthenticated(true);
        setJwtToken(token); // 로그인 시 JWT 토큰 저장
        setUserInfo(user); // 사용자 정보를 설정
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserInfo(null); // 사용자 정보 초기화
        setJwtToken(null); // JWT 토큰 초기화
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, userInfo, setUserInfo, jwtToken }}>
            {children}
        </AuthContext.Provider>
    );
};
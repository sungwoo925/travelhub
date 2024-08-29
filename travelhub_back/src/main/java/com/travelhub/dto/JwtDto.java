package com.travelhub.dto;

public class JwtDto {
    private String token; // JWT 토큰
    private String userId; // 사용자 ID 추가

    public JwtDto(String token, String userId) {
        this.token = token; // 생성자
        this.userId = userId; // 사용자 ID 설정
    }

    public String getToken() {
        return token; // 토큰 반환
    }

    public String getUserId() {
        return userId; // 사용자 ID 반환
    }

    public void setToken(String token) {
        this.token = token; // 토큰 설정
    }

    public void setUserId(String userId) {
        this.userId = userId; // 사용자 ID 설정
    }
}
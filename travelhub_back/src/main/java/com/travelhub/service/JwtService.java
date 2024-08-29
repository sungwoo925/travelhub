package com.travelhub.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    private static final String SECRET_KEY = "your-secret-key"; // 비밀 키
    private static final long EXPIRATION_TIME = 86400000; // 1일 (밀리초)

    // JWT 생성 메서드
    public String generateToken(String userEmail) {
        return Jwts.builder()
                .setSubject(userEmail) // 사용자 이메일 설정
                .setIssuedAt(new Date()) // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 만료 시간
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 서명 알고리즘 및 비밀 키
                .compact();
    }

    // JWT 검증 및 사용자 ID 반환 메서드
    public String validateTokenAndGetUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY) // 비밀 키 설정
                .parseClaimsJws(token) // 토큰 파싱
                .getBody();
        return claims.getSubject(); // 사용자 이메일 반환
    }
}
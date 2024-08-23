package com.travelhub.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private String secretKey = "yousfecre1y"; // 비밀 키
    private long expirationTime = 1000 * 60 * 60 * 24 * 7; // 7dday

    public String generateToken(String userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId); // 사용자 ID를 claims에 추가
        return createToken(claims, userId);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String extractUserId(String token) {
        return extractAllClaims(token).get("id", String.class); // ID 정보 추출
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }
}

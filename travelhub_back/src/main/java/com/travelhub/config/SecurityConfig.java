package com.travelhub.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    // 모든 요청을 인증 없이 허용
                    .anyRequest().permitAll()
            );
        return http.build();
    }
}

// package com.travelhub.config;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.oauth2.jwt.JwtDecoder;
// import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
// import org.springframework.security.web.SecurityFilterChain;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Bean
//     public JwtDecoder jwtDecoder() {
//         return NimbusJwtDecoder.withJwkSetUri("https://your-issuer-uri/.well-known/jwks.json").build();
//     }

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .authorizeHttpRequests(authorizeRequests -> 
//                 authorizeRequests
//                     .anyRequest().permitAll()
//                 )
//             .headers(headers -> headers.frameOptions().sameOrigin()); // frameOptions() 대체
//         return http.build();
//     }

//     public String generateToken(String id) {
//         return Jwts.builder()
//             .claim("id", id) // ID 정보 추가
//             .signWith(SignatureAlgorithm.HS256, "your-signing-key".getBytes()) // 서명 키 설정
//             .compact();
//     }

//     // ID를 반환하는 메서드 추가
//     public String extractIdFromToken(String token) {
//         Claims claims = Jwts.parser()
//             .setSigningKey("your-signing-key") // 서명 키 설정
//             .parseClaimsJws(token)
//             .getBody();
//         return claims.get("id", String.class); // ID 정보 반환
//     }
// }

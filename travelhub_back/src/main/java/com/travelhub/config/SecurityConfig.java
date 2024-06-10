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
            .authorizeRequests()
            // "/auth/**" 경로는 인증 없이 접근 허용
            .requestMatchers("/auth/**").permitAll()
            // "/auth/**"를 제외한 모든 경로는 인증된 사용자만 접근 허용
            .anyRequest().authenticated()
            .and()
            .oauth2ResourceServer()
            .jwt();
        return http.build();
    }
}
package com.travelhub.controller;
import com.travelhub.service.JwtService; 
import com.travelhub.dto.LoginRequest;
import com.travelhub.entity.User;
import com.travelhub.repository.UserRepository;
import com.travelhub.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService; // JwtService 주입
    @Autowired
    private JwtUtil jwtUtil; // JwtUtil 주입 추가

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/checkToken")
    public ResponseEntity<String> checkToken(@RequestBody String token) {
        String userId = jwtUtil.extractUserId(token.split("token000111222")[1]); // ID 정보 추출+ userId
        return ResponseEntity.ok("Token is valid. User ID: " + userId);
    }

    @PostMapping("/checkUsername/{useremail}")
    public ResponseEntity<String> checkUsername(@PathVariable String useremail) {
        boolean isAvailable = userRepository.findByUserEmail(useremail).isEmpty();        
        String response = "{\"isAvailable\": " + isAvailable + "}";
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println(user.getUserPassword());
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userRepository.findByUserEmail(loginRequest.getUserEmail());
    if (optionalUser.isPresent() && passwordEncoder.matches(loginRequest.getUserPassword(), optionalUser.get().getUserPassword())) {
        int userId = optionalUser.get().getUserId(); // 사용자 ID 가져오기
        String userId_String = String.valueOf(userId);
        String token = jwtUtil.generateToken(userId_String); // ID를 포함하여 토큰 생성
        return ResponseEntity.ok(token);
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    }

    @GetMapping("/user")
    public ResponseEntity<String> getUserId(@RequestHeader("Authorization") String token) {
        String userId = jwtService.validateTokenAndGetUserId(token.replace("Bearer ", "")); // JWT 검증 및 ID 반환
        return ResponseEntity.ok(userId);
    }
}

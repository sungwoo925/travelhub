package com.travelhub.controller;

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
    private JwtUtil jwtUtil;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/checkToken")
    public ResponseEntity<String> checkToken(@RequestBody String token) {
        return ResponseEntity.ok(token);
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
            String token = jwtUtil.generateToken(loginRequest.getUserEmail());
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

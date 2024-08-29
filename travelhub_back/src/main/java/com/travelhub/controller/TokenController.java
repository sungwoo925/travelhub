// package com.travelhub.controller;

// import com.travelhub.config.SecurityConfig;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api")
// public class TokenController {

//     private final SecurityConfig securityConfig;

//     public TokenController(SecurityConfig securityConfig) {
//         this.securityConfig = securityConfig;
//     }

//     @PostMapping("/token")
//     public String createToken(@RequestBody Map<String, String> payload) {
//         String id = payload.get("id");
//         return securityConfig.generateToken(id);
//     }

//     @PostMapping("/extractId")
//     public String extractId(@RequestBody Map<String, String> payload) {
//         String token = payload.get("token");
//         return securityConfig.extractIdFromToken(token);
//     }
// }
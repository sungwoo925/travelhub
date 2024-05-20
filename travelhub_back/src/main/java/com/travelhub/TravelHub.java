package com.travelhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TravelHub {
    // VertexAiGeminiChatClient chatClient;

    public static void main(String[] args) {
        SpringApplication.run(TravelHub.class, args);
    }

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/travels/{option}")
    public String hello(@PathVariable String option) {
        return option;
    }

    // @CrossOrigin(origins = "http://localhost:8888")
    // @GetMapping("api/users/{word}")
    // public String search(@PathVariable String word) {
    //     String username = word.replaceAll("\\s+", "_").toLowerCase(); // 공백을 _로 대체하고 소문자로 변환
    //     return "{\"id\": 1, \"username\": \"" + username + "\", \"email\": \"" + username + "@example.com\"}";
    // }

}
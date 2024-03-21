package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/")
    public String hello() {
        return "hello";
    }
    
    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/json")
    public String getJson() {
        return "{\"message\": \"hello\"}";
    }
}

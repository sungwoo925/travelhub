package com.travelhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TravelHub {
    public static void main(String[] args) {
        SpringApplication.run(TravelHub.class, args);
    }
}
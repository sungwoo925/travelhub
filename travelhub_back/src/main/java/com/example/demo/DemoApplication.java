package com.example.demo;

import org.json.JSONObject;
import java.io.FileReader;
import java.io.IOException;
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
        getJsonA("./secinfo.json","databaseIp");
        return "{\"message\": \"hello\"}";
    }

    public static String getJsonA(String filePath, String name){
        // filePath = "./secinfo.json";
        // name = "databasIp";

        try {

            FileReader reader = new FileReader(filePath);

            StringBuilder content = new StringBuilder();
            int character;
            while ((character = reader.read()) != -1) {
                content.append((char) character);
            }

            JSONObject json = new JSONObject(content.toString());
            System.out.println(json.getString(name));  
            reader.close();
            return json.getString(name);
        } catch (IOException e) {
            e.printStackTrace();
            return "error";
        }
    }
}

package com.example.demo;

import java.io.IOException;
import java.io.File;
import java.io.FileInputStream;
import java.io.ByteArrayOutputStream;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;

import com.google.maps.GeoApiContext;
import com.google.maps.PlacesApi;
import com.google.maps.TextSearchRequest;
import com.google.maps.model.PlacesSearchResponse;
import com.google.maps.model.PlacesSearchResult;

@SpringBootApplication
@RestController
public class DemoApplication {
    @Autowired
    private Environment env;

    // VertexAiGeminiChatClient chatClient;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/travels/{option}")
    public String hello(@PathVariable String option) {
        return option;
    }

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("api/users/{word}")
    public String search(@PathVariable String word) {
        String username = word.replaceAll("\\s+", "_").toLowerCase(); // 공백을 _로 대체하고 소문자로 변환
        return "{\"id\": 1, \"username\": \"" + username + "\", \"email\": \"" + username + "@example.com\"}";
    }
    
    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/maps/{locationName}")
    public String mapInfoString(@PathVariable String locationName) {
        try {
            return searchPlaces(locationName,env);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "error";
        }
    }

    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/jemini")
    public String jemini() {
        try {
            String projectId = "my-project-loc8c";
            String location = "us-central1";
            String modelName = "gemini-1.0-pro-vision";

            String output = quickstart(projectId, location, modelName);
            return output;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "error";
        }
    }
    
    

    public static String quickstart(String projectId, String location, String modelName)
        throws IOException {
        // Initialize client that will be used to send requests. This client only needs
        // to be created once, and can be reused for multiple requests.
        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
        String imageUri = "./image5.png";

        GenerativeModel model = new GenerativeModel(modelName, vertexAI);

        GenerateContentResponse response = model.generateContent(ContentMaker.fromMultiModalData(
            PartMaker.fromMimeTypeAndData("image/png", readImageFile(imageUri)),
            "해당하는 해시태그 5개"
        ));

        return ResponseHandler.getText(response);
        }
    }

    public static byte[] readImageFile(String filePath) throws IOException {
        File file = new File(filePath);
        
        // 파일이 존재하는지 확인
        if (!file.exists()) {
            throw new IOException("File not found: " + filePath);
        }
        
        // 이미지 파일을 읽어들일 FileInputStream 생성
        try (FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            
            byte[] buffer = new byte[1024];
            int bytesRead;
            
            // FileInputStream으로부터 데이터를 읽어들여 ByteArrayOutputStream에 쓰기
            while ((bytesRead = fis.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            
            // ByteArrayOutputStream에 저장된 데이터를 byte 배열로 변환하여 반환
            return outputStream.toByteArray();
        }
    }


    private static String searchPlaces(String placeName,Environment env) throws Exception {
        String apiKey1 = env.getProperty("api.mapkey");

        GeoApiContext context = new GeoApiContext.Builder()
                                    .apiKey(apiKey1)
                                    .build();
        TextSearchRequest request = PlacesApi.textSearchQuery(context, placeName);
        PlacesSearchResponse response = request.await();

        JSONArray jsonArray = new JSONArray();
        for (PlacesSearchResult result : response.results) {
            JSONObject placeObject = new JSONObject();
            placeObject.put("name", result.name);
            placeObject.put("latitude", result.geometry.location.lat);
            placeObject.put("longitude", result.geometry.location.lng);
            jsonArray.put(placeObject);
        }
        return jsonArray.toString();
    }
}
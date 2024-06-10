package com.travelhub.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;

@RestController
public class GeminiController {
    @CrossOrigin(origins = "http://localhost:8888")
    @GetMapping("/gemini")
    public String Gemini() {
        try {
            String projectId = "gen-lang-client-0924727192";
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
        String imageUri = "C:\\image5.png";

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
}

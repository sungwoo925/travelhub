package com.travelhub.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.nio.file.Paths;

@RestController
public class ImageController {
    @Autowired
    private Environment env;
    private final String baseDirectory =  env.getProperty("dir.image");// 외부 파일이 위치한 기본 디렉토리

    @GetMapping("/images/{prop1}/{prop2}/{prop3}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String prop1,
            @PathVariable String prop2,
            @PathVariable String prop3) {

        try {
            // 파일 경로 설정
            String filePath = Paths.get(baseDirectory, prop1, prop2, prop3).toString();
            File file = new File(filePath);

            // 파일 존재 여부 확인
            if (!file.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            // 파일 리소스 생성
            Resource resource = new FileSystemResource(file);

            // 응답 헤더 설정 (파일 다운로드 시 필요한 경우)
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + prop3 + "\"");
            headers.add(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE); // 이미지 유형 설정

            // 파일을 포함한 응답 반환
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

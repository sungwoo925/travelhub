package com.travelhub.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import com.travelhub.dto.SequenceInfoRequest;
import com.travelhub.entity.Journal;
import com.travelhub.service.JournalService;

@RestController
@RequestMapping("/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        String path = "./image.jpg";

        try {
            File localFile = new File(path); // 로컬에 저장할 파일 경로 및 이름 설정
            FileOutputStream fileOutputStream = new FileOutputStream(localFile);
            fileOutputStream.write(file.getBytes());
            fileOutputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
            return "이미지 업로드에 실패했습니다.";
        }
        try {
            String projectId = "gen-lang-client-0924727192";
            String location = "us-central1";
            String modelName = "gemini-1.0-pro-vision";

            String output = quickstart(projectId, location, modelName, path);
            return output;
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "error";
        }
    }
    @PostMapping
    public ResponseEntity<Journal> createJournal(@RequestBody Journal journal) {
        Journal savedJournal = journalService.createJournal(journal);
        return new ResponseEntity<>(savedJournal, HttpStatus.CREATED);
    }
    @PutMapping("/{journalId}")
    public ResponseEntity<Journal> updateJournal(@PathVariable Long journalId, @RequestBody Journal journal) {
        Journal updatedJournal = journalService.updateJournal(journalId, journal);
        return new ResponseEntity<>(updatedJournal, HttpStatus.OK);
    }
    @PutMapping("/{journalId}/sequence")
    public ResponseEntity<Journal> updateJournalSequences(@PathVariable Long journalId, @RequestBody SequenceInfoRequest sequenceInfoRequest) {
        Journal updatedJournal = journalService.updateJournalSequence(journalId, sequenceInfoRequest.getSequenceInfo());
        return new ResponseEntity<>(updatedJournal, HttpStatus.OK);
    }

    @GetMapping("/{journalId}")
    public ResponseEntity<Journal> getJournalById(@PathVariable Long journalId) {
        Journal journal = journalService.findJournalById(journalId);
        
        if (journal != null) {
            return new ResponseEntity<>(journal, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{journalId}")
    public ResponseEntity<Void> deleteJournal(@PathVariable Long journalId) {
        boolean deleted = journalService.deleteJournal(journalId);
        
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 삭제 성공
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 삭제할 여정이 없는 경우
        }
    }

    public static String quickstart(String projectId, String location, String modelName, String imageUri)
        throws IOException {
        // Initialize client that will be used to send requests. This client only needs
        // to be created once, and can be reused for multiple requests.
        try (VertexAI vertexAI = new VertexAI(projectId, location)) {

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

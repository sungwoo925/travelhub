package com.travelhub.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

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
import com.travelhub.dto.JournalUpdateDTO;
import com.travelhub.dto.SequenceInfoRequest;
import com.travelhub.entity.Journal;
import com.travelhub.entity.Travel;
import com.travelhub.service.JournalService;
import com.travelhub.service.TravelService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/journals")
public class JournalController {

    @Autowired
    private JournalService journalService;

    @Autowired
    private TravelService travelService;

    @PostMapping("/uploadImage/{travelId}/{userId}")
    public ResponseEntity<String> uploadImage(@PathVariable Long travelId, @PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        String directoryPath = String.format("./travelhub_back/src/main/resources/static/images/%d/%d", travelId, userId);
        File directory = new File(directoryPath);
        Journal savedJournal ;

        // 디렉토리 생성
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 이미지 파일 이름 생성
        String fileName = String.format("image%d.jpg", directory.listFiles() == null ? 1 : directory.listFiles().length + 1);
        File localFile = new File(directory, fileName);

        try (FileOutputStream fileOutputStream = new FileOutputStream(localFile)) {
            fileOutputStream.write(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("이미지 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        //수정중
       try {
        // Travel 객체를 ID로 조회
        Travel travel = travelService.findById(travelId); // travelService를 통해 Travel 객체 조회

            // 이미지 파일을 저장한 후 저널 생성
            Journal journal = new Journal(
                travel, // Travel 객체
                "저널 텍스트 예시", // journalText
                LocalDate.now(), // journalDate
                "위치 이름 예시", // journalLocationName
                "위도 예시", // journalLocationLatitude
                "경도 예시", // journalLocationLongitude
                localFile.getPath(), // photoLink
                "날씨 예시", // Weather
                (short) 0 // sequenceInfo
            );

            savedJournal = journalService.createJournal(journal); // 저널 저장
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return new ResponseEntity<>("여행을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        try {
            String projectId = "gen-lang-client-0924727192";
            String location = "us-central1";
            String modelName = "gemini-1.0-pro-vision";

            String output =  " t e s t"; //quickstart(projectId, location, modelName, directoryPath);// 제미나이 비용 발생으로 막아둠
            return new ResponseEntity<>(savedJournal.getJournalId() + output, HttpStatus.OK);            
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return new ResponseEntity<>("hashtag error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Journal> createJournal(@RequestBody Journal journal) {
        Journal savedJournal = journalService.createJournal(journal);
        return new ResponseEntity<>(savedJournal, HttpStatus.CREATED);
    }
    @PutMapping("/{journalId}")
    public ResponseEntity<String> updateJournal(
            @PathVariable Long journalId,
            @RequestBody JournalUpdateDTO journalUpdateDTO) {
        boolean isUpdated = journalService.updateJournal(journalId, journalUpdateDTO);
        
        if (isUpdated) {
            return ResponseEntity.ok("저널이 성공적으로 업데이트되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("저널을 찾을 수 없습니다.");
        }
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
    public ResponseEntity<String> deleteJournal(@PathVariable Long journalId) {
        boolean deleted = journalService.deleteJournal(journalId);
        
        if (deleted) {
            return new ResponseEntity<>("success",HttpStatus.OK); // 삭제 성공
        } else {
            return new ResponseEntity<>("fail",HttpStatus.OK); // 삭제할 여정이 없는 경우
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

    @GetMapping("/travel/{travelId}")
    public List<Journal> getJournalsByTravelId(@PathVariable Long travelId) {
        Optional<Travel> traveloOptional = travelService.getTravel(travelId);
        if (traveloOptional.isPresent()) {
            Travel travel = traveloOptional.get(); // 값이 존재할 경우 가져오기
            // travelReal을 사용하여 추가 처리
            return journalService.getJournalsByTravelId(travel);
        } else {
            // travel이 존재하지 않을 경우 처리
            return new ArrayList<>();
        }
    }
}

package com.travelhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.travelhub.dto.LikesDTO;
import com.travelhub.entity.Likes;
import com.travelhub.entity.User;
import com.travelhub.entity.Travel;
import com.travelhub.service.LikesService;
import com.travelhub.repository.TravelRepository;
import java.util.NoSuchElementException; // NoSuchElementException 추가
import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikesController {

    @Autowired
    private LikesService likesService;

    @Autowired
    private TravelRepository travelRepository;

    @PostMapping
    public ResponseEntity<?> addLike(@RequestBody LikesDTO likesDTO) {
        try {
            User user = new User();
            user.setUserId(likesDTO.getUserId());
            
            Travel travel = travelRepository.findById((long) likesDTO.getTravelId())
                .orElseThrow(() -> new NoSuchElementException("Travel not found")); // Travel 존재 여부 확인
            
            Likes like = new Likes(user, travel);
            likesService.addLike(like);
            
            return ResponseEntity.ok().body("{\"status\": 200}");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"status\": 404, \"message\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            e.printStackTrace(); // 오류 메시지를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": 500, \"message\": \"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/{travelId}") // travelId를 PathVariable로 변경
    public ResponseEntity<?> removeLikeByTravelId(@PathVariable int travelId, @RequestParam int userId) { // userId를 쿼리 파라미터로 받음
        try {
            User user = new User();
            user.setUserId(userId);
            Travel travel = travelRepository.findById((long) travelId) // travelId로 Travel 객체를 조회
                .orElseThrow(() -> new NoSuchElementException("Travel not found")); // Travel 존재 여부 확인
            likesService.removeLikeByTravelId(travel, user); // Travel 객체와 user를 사용하여 삭제
            return ResponseEntity.ok().body("{\"status\": 200}");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"status\": 404, \"message\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            e.printStackTrace(); // 오류 메시지를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"status\": 500, \"message\": \"" + e.getMessage() + "\"}"); // 예외 메시지 추가
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Integer>> getLikesByUser(@PathVariable int userId) {
        User user = new User();
        user.setUserId(userId);
        List<Integer> travelIds = likesService.getLikesByUser(user);
        return ResponseEntity.ok(travelIds);
    }
}

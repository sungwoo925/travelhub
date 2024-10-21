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
import com.travelhub.service.UserService;
import com.travelhub.repository.TravelRepository;

import java.util.NoSuchElementException; // NoSuchElementException 추가
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikesController {

    @Autowired
    private LikesService likesService;

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    private UserService userService;


    @PostMapping
    public ResponseEntity<Travel> addLike(@RequestBody LikesDTO likesDTO) {
        try {
            
            Optional<User> user = userService.getUserById((long) likesDTO.getUserId());
            Travel travel = travelRepository.findById((long) likesDTO.getTravelId())
                .orElseThrow(() -> new NoSuchElementException("Travel not found")); // Travel 존재 여부 확인
            Likes like = new Likes(user.get(), travel);
            likesService.addLike(like);
            return new ResponseEntity<>(travel,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // 오류 메시지를 콘솔에 출력
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/delete") // travelId를 PathVariable로 변경
    public ResponseEntity<Travel> removeLikeByTravelId(@RequestBody LikesDTO likesDTO) { // userId를 쿼리 파라미터로 받음
        try {
            Optional<User> user = userService.getUserById((long) likesDTO.getUserId());  
            Travel travel = travelRepository.findById((long) likesDTO.getTravelId()) // travelId로 Travel 객체를 조회
                .orElseThrow(() -> new NoSuchElementException("Travel not found")); // Travel 존재 여부 확인
            likesService.removeLikeByTravelId(travel, user.get()); // Travel 객체와 user를 사용하여 삭제
            return new ResponseEntity<>(travel,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // 오류 메시지를 콘솔에 출력
            return new ResponseEntity<>(HttpStatus.OK);
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

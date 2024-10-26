package com.travelhub.controller;

import com.travelhub.entity.Travel;
import com.travelhub.entity.User;
import com.travelhub.service.TravelService;
import com.travelhub.service.UserService;
import com.travelhub.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/travels")
public class TravelController {

    @Autowired // 자동으로 연결해준다는 의미 안해주면 데이터 동기화가 안됨
    private TravelService travelService;
    @Autowired
    private JwtUtil jwtUtil; // JwtUtil 주입 추가
    @Autowired
    private UserService userService;

    // 여행 검색 - 해시태그로 검색
    @GetMapping("/search/hashtag")
    public ResponseEntity<List<Travel>> searchByHashtag(@RequestBody Map<String, Object> params) {
        List<Travel> travels = travelService.searchByHashtag((List<String>) params.get("hashtags"));
        return new ResponseEntity<>(travels, HttpStatus.OK);
    }

    // 여행 검색 - 제목으로 검색
    @GetMapping("/search/title")
    public ResponseEntity<List<Travel>> searchByTitle(@RequestBody Map<String, String> params) {
        List<Travel> travels = travelService.searchByTitle(params.get("title"));
        return new ResponseEntity<>(travels, HttpStatus.OK);
    }

    // 특정 여행 가져오기
    @PostMapping("/{travelId}")
    public ResponseEntity<Travel> getTravel(@PathVariable Integer travelId,@RequestBody String token) {
        String userId = jwtUtil.extractUserId(token.split("token000111222")[1]); // ID 정보 추출+ userId        
        Optional<Travel> travelOptional = travelService.getTravel(travelId);
        if(travelOptional.isEmpty()){
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            Travel travel = travelOptional.get();
            if(travel.getUserId() == Long.parseLong(userId)){
                return new ResponseEntity<>(travel,HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new Travel(),HttpStatus.OK);
    }

    @GetMapping("/{travelId}")
    public ResponseEntity<Travel> getTravel(@PathVariable Integer travelId) {
        Optional<Travel> travelOptional = travelService.getTravel(travelId);
        if(travelOptional.isEmpty()){
            new ResponseEntity<>(new Travel(),HttpStatus.OK);
        }else{
            Travel travel = travelOptional.get();
            if(travel.getTravelShareOption()){
                return new ResponseEntity<>(travel,HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new Travel(),HttpStatus.OK);
    }

    // 여행 입력
    @PostMapping
    public ResponseEntity<String> createTravel(@RequestBody Travel travel) {
        try{
            Optional<User> userOptional = userService.getUserById(travel.getUserId());
            User user = userOptional.get();
            List<Travel> findTravelList = travelService.searchByUserIdAndLocation(user.getUserId(), travel.getTravelLocationLatitude());
            if(findTravelList.isEmpty()){
                Travel savedTravel = travelService.createTravel(travel);
                // travelId가 null인지 확인
                if (savedTravel.getTravelId() == 0) {
                    return new ResponseEntity<>("여행 ID가 생성되지 않았습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
                }
                return new ResponseEntity<>(Integer.toString(savedTravel.getTravelId()), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(Integer.toString(findTravelList.get(0).getTravelId()), HttpStatus.CREATED);
            }
        }catch(NumberFormatException e){
            return new ResponseEntity<>( HttpStatus.CREATED);
        }
    }

    // 여행 수정
    @PutMapping("/{travelId}")
    public ResponseEntity<Travel> updateTravel(@PathVariable int travelId, @RequestBody Travel travelDetails) {
        Optional<Travel> updatedTravel = travelService.updateTravel(travelId, travelDetails);
        return updatedTravel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 여행 공유 여부 수정
    @PutMapping("/{travelId}/share")
    public ResponseEntity<Travel> updateTravelShareOption(@PathVariable int travelId, @RequestBody Map<String, String> params) {
        Optional<Travel> updatedTravel = travelService.updateTravelShareOption(travelId, params.get("shareOption"));
        return updatedTravel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 여행 삭제
    @DeleteMapping("/{travelId}")
    public ResponseEntity<Void> deleteTravel(@PathVariable int travelId) {
        boolean deleted = travelService.deleteTravel(travelId);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // 모든 여행 정보 가져오기 (travelShareOption이 1인 경우만)
    @GetMapping 
    public ResponseEntity<List<Travel>> getAllTravels() {
        List<Travel> travels = travelService.getTravelWithShareOption();

        return new ResponseEntity<>(travels, HttpStatus.OK);
    }
}

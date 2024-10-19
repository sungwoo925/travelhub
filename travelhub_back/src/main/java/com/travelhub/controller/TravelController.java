package com.travelhub.controller;

import com.travelhub.entity.Travel;
import com.travelhub.entity.User;
import com.travelhub.service.TravelService;
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
    @GetMapping("/{travelId}")
    public ResponseEntity<Travel> getTravel(@PathVariable Long travelId) {
        Optional<Travel> travel = travelService.getTravel(travelId);
        return travel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                     .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 여행 입력
    @PostMapping
    public ResponseEntity<String> createTravel(@RequestBody Travel travel) {
        User user = travel.getUserId();
        List<Travel> findTravelList = travelService.searchByUserIdAndLocation(user, travel.getTravelLocationLatitude());
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
        
    }

    // 여행 수정
    @PutMapping("/{travelId}")
    public ResponseEntity<Travel> updateTravel(@PathVariable Long travelId, @RequestBody Travel travelDetails) {
        Optional<Travel> updatedTravel = travelService.updateTravel(travelId, travelDetails);
        return updatedTravel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 여행 공유 여부 수정
    @PutMapping("/{travelId}/share")
    public ResponseEntity<Travel> updateTravelShareOption(@PathVariable Long travelId, @RequestBody Map<String, String> params) {
        Optional<Travel> updatedTravel = travelService.updateTravelShareOption(travelId, params.get("shareOption"));
        return updatedTravel.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // 여행 삭제
    @DeleteMapping("/{travelId}")
    public ResponseEntity<Void> deleteTravel(@PathVariable Long travelId) {
        boolean deleted = travelService.deleteTravel(travelId);
        return deleted ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // 모든 여행 정보 가져오기 (travelShareOption이 1인 경우만)
    @GetMapping 
    public ResponseEntity<List<Travel>> getAllTravels() {
        List<Travel> travels = travelService.getAllTravels();
        
        // travelShareOption이 1인 경우만 필터링
        List<Travel> filteredTravels = travels.stream()
            .filter(travel -> travel.getTravelShareOption() == true) // travelShareOption이 1인 경우
            .collect(Collectors.toList());

        return new ResponseEntity<>(filteredTravels, HttpStatus.OK);
    }
}

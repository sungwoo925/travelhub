package com.travelhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelhub.entity.Likes;
import com.travelhub.entity.Travel;
import com.travelhub.entity.User;
import com.travelhub.repository.LikesRepository;
import com.travelhub.repository.TravelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;

    @Autowired
    private TravelRepository travelRepository;

    public void addLike(Likes like) {
        // 이미 좋아요가 존재하는지 확인
        List<Likes> existingLike = likesRepository.findByUserId(like.getUserId()); // 수정: travelId를 int로 사용
        
        if (existingLike != null) {
            // 이미 좋아요가 존재하면 아무 작업도 하지 않거나, 필요에 따라 처리
            return; // 또는 기존 좋아요 수를 증가시키는 로직 추가
        }
        
        // 새로운 좋아요 추가
        likesRepository.save(like);
        
        Travel travel = travelRepository.findById((long) like.getTravelId().getTravelId()) // int를 long으로 변환
            .orElseThrow(() -> new RuntimeException("Travel not found"));
        
        travel.setLikeCount(travel.getLikeCount() + 1); // 좋아요 수 증가
        travelRepository.save(travel);
    }


    public List<Integer> getLikesByUser(User user) {
        return likesRepository.findByUserId(user)
                              .stream()
                              .map(like -> like.getTravelId().getTravelId())
                              .collect(Collectors.toList());
    }

    public void removeLikeByTravelId(Travel travel, User user) { // 매개변수 이름 수정
        // 해당 여행에 대한 사용자의 좋아요를 찾음
        List<Likes> likes = likesRepository.findByUserId(user); // 수정: 사용자 객체로 검색
        if (likes.isEmpty()) { // 수정: 리스트가 비어있는지 확인
            throw new RuntimeException("Like not found for the given travelId");
        } 
        
        Likes like = likes.stream().filter(l -> l.getTravelId().getTravelId() == travel.getTravelId()).findFirst().orElse(null); // 수정: like 객체를 찾기
        if (like == null) { // 수정: null 체크
            throw new RuntimeException("Like not found for the given travelId");
        }

        Travel travelEntity = like.getTravelId(); // 수정: travel 가져오기
        travelEntity.setLikeCount(travelEntity.getLikeCount() - 1); // 좋아요 수 감소
        likesRepository.delete(like);  // Likes 엔티티 삭제
        travelRepository.save(travelEntity);  // Travel 엔티티 업데이트
    }

    
}

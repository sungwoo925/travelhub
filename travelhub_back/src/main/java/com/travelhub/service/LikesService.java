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
        Likes existingLike = likesRepository.findByUserIdAndTravelId(like.getUserId(), like.getTravelId());
        
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

    public void removeLike(int likeId) {
        Likes like = likesRepository.findById(likeId).orElseThrow(() -> new RuntimeException("Like not found"));
        
        Travel travel = like.getTravelId();
        travel.setLikeCount(travel.getLikeCount() - 1);
        likesRepository.delete(like);  // Likes 엔티티 삭제
        travelRepository.save(travel);  // Travel 엔티티 업데이트
    }

    public List<Integer> getLikesByUser(User user) {
        return likesRepository.findByUserId(user)
                              .stream()
                              .map(like -> like.getTravelId().getTravelId())
                              .collect(Collectors.toList());
    }

    
}

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
        likesRepository.save(like);
        
        Travel travel = like.getTravelId();
        travel.setLikeCount(travel.getLikeCount() + 1);
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

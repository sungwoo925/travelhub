package com.travelhub.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelhub.entity.Likes;
import com.travelhub.entity.User;
import com.travelhub.repository.LikesRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LikesService {

    @Autowired
    private LikesRepository likesRepository;

    public void addLike(Likes like) {
        likesRepository.save(like);
    }

    public void removeLike(int likeId) {
        likesRepository.deleteById(likeId);
    }

    public List<Integer> getLikesByUser(User user) {
        return likesRepository.findByUserId(user)
                              .stream()
                              .map(like -> like.getTravelId().getTravelId())
                              .collect(Collectors.toList());
    }
}

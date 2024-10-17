package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Likes;
import com.travelhub.entity.User;
import com.travelhub.entity.Travel;
import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    List<Likes> findByUserId(User userId);
    Likes findByUserIdAndTravelId(User userId, Travel travelId);
}

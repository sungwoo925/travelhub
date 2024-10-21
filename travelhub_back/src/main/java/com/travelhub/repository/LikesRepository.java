package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Likes;
import com.travelhub.entity.User;
import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Integer> {
    List<Likes> findByUserId(User userId);
}

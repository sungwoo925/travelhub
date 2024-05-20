package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Likes;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    // 여기에 사용자 관련 메서드 추가 가능
}

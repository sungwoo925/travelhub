package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 여기에 사용자 관련 메서드 추가 가능
}

package com.travelhub.repository;

import com.travelhub.entity.Comment;
import com.travelhub.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 사용자 ID 타입을 Long으로 변경합니다.
    List<Comment> findByUserId(User userId);
}

package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 여기에 사용자 관련 메서드 추가 가능
}

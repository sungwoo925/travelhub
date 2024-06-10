package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
   //List<Comment> findByUserId(Long userId);
}
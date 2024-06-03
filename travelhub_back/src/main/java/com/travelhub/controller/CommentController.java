package com.travelhub.controller;
import java.time.LocalDateTime;
import com.travelhub.entity.Comment;
import com.travelhub.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // 모든 댓글 조회
    @GetMapping("/comments")
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return ResponseEntity.ok(comments);
    }
    
    // 사용자 ID로 댓글 조회
    // @GetMapping("/comments/user/{userId}")
    // public ResponseEntity<List<Comment>> getCommentsByUserId(@PathVariable Long userId) {
    //     List<Comment> comments = commentRepository.findByUserId(userId);
    //     return ResponseEntity.ok(comments);
    // }

    // 댓글 작성
    @PostMapping("/comments")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        // Comment 엔티티에 생성자를 사용하여 코멘트 생성
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }


    // 댓글 삭제
    // @DeleteMapping("/comments/{commentId}")
    // public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
    //     Optional<Comment> optionalComment = commentRepository.findById(commentId);
    //     if (optionalComment.isPresent()) {
    //         commentRepository.deleteById(commentId);
    //         return ResponseEntity.noContent().build();
    //     } else {
    //         return ResponseEntity.notFound().build();
    //     }
    // }
}

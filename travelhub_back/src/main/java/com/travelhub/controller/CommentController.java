//Original code

// package com.travelhub.controller;
// import java.time.LocalDateTime;
// import com.travelhub.entity.Comment;
// import com.travelhub.repository.CommentRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @Controller
// public class CommentController {

//     @Autowired
//     private CommentRepository commentRepository;

//     // 모든 댓글 조회
//     @GetMapping("/comments")
//     public ResponseEntity<List<Comment>> getAllComments() {
//         List<Comment> comments = commentRepository.findAll();
//         return ResponseEntity.ok(comments);
//     }
    
//     // 사용자 ID로 댓글 조회
//     // @GetMapping("/comments/user/{userId}")
//     // public ResponseEntity<List<Comment>> getCommentsByUserId(@PathVariable Long userId) {
//     //     List<Comment> comments = commentRepository.findByUserId(userId);
//     //     return ResponseEntity.ok(comments);
//     // }

//     // 댓글 작성
//     @PostMapping("/comments")
//     public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
//         // Comment 엔티티에 생성자를 사용하여 코멘트 생성
//         Comment savedComment = commentRepository.save(comment);
//         return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
//     }


//     // 댓글 삭제
//     // @DeleteMapping("/comments/{commentId}")
//     // public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
//     //     Optional<Comment> optionalComment = commentRepository.findById(commentId);
//     //     if (optionalComment.isPresent()) {
//     //         commentRepository.deleteById(commentId);
//     //         return ResponseEntity.noContent().build();
//     //     } else {
//     //         return ResponseEntity.notFound().build();
//     //     }
//     // }
// }

// MY CODE
package com.travelhub.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.travelhub.entity.Comment;
import com.travelhub.entity.User;
import com.travelhub.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
    
    // 사용자 ID로 댓글 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Comment>> getCommentsByUserId(@PathVariable("userId") User userId) {
        List<Comment> comments = commentRepository.findByUserId(userId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }


    // 댓글 작성
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        comment = commentRepository.save(comment);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()) {
            commentRepository.deleteById(commentId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable("commentId") Long commentId, @RequestBody Comment commentDetails) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if (comment.isPresent()) {
            Comment updatedComment = comment.get();
            updatedComment.setCommentText(commentDetails.getCommentText());
            updatedComment.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(updatedComment);
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}



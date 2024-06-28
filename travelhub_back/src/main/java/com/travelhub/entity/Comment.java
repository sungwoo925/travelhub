package com.travelhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Column(nullable = false)
    private int travelId;

    @Column(nullable = false, length = 150)
    private String commentText;

    @Column(nullable = false)
    private LocalDateTime commentDate;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // @Column(nullable = false)
    // private LocalDateTime createdAt;
    // 기본 생성자
    public Comment() {
    }

    // 요청 데이터를 바로 설정하는 생성자
    @JsonCreator
    public Comment(
        @JsonProperty("user_id") User userId,
        @JsonProperty("travel_id") int travelId,
        @JsonProperty("comment_text") String commentText,
        @JsonProperty("comment_date") LocalDateTime commentDate) {
        this.userId = userId;
        this.travelId = travelId;
        this.commentText = commentText;
        this.commentDate = commentDate;
        this.updatedAt = commentDate; // 생성 시 updatedAt 초기화
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public int getTravelId() {
        return travelId;
    }

    public void setTravelId(int travelId) {
        this.travelId = travelId;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public LocalDateTime getCommentDate() {
        return commentDate;
    }
    // public LocalDateTime getCreatedAt() {
    //     return createdAt;
    // }

    public void setCommentDate(LocalDateTime commentDate) {
        this.commentDate = commentDate;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

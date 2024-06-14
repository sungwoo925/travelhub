package com.travelhub.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    private Travel travelId;

    // 기본 생성자
    public Likes() {
    }

    // 요청 데이터를 바로 설정하는 생성자
    @JsonCreator
    public Likes(
        @JsonProperty("user_id") User userId,
        @JsonProperty("travel_id") Travel travelId) {
        this.userId = userId;
        this.travelId = travelId;
    }

    // Getter와 Setter 메소드들
    public int getLikeId() {
        return likeId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Travel getTravelId() {
        return travelId;
    }

    public void setTravelId(Travel travelId) {
        this.travelId = travelId;
    }
}
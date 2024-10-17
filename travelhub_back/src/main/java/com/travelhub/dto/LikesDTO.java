package com.travelhub.dto;

public class LikesDTO {
    private int userId; // user_id
    private int travelId; // travel_id

    // 기본 생성자
    public LikesDTO() {
    }

    // 매개변수 있는 생성자
    public LikesDTO(int userId, int travelId) {
        this.userId = userId;
        this.travelId = travelId;
    }

    // Getter와 Setter 메소드들
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTravelId() {
        return travelId;
    }

    public void setTravelId(int travelId) {
        this.travelId = travelId;
    }
}
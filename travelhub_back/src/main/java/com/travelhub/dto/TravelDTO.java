package com.travelhub.dto;

import java.time.LocalDateTime;

import com.travelhub.entity.Travel;

public class TravelDTO {

    private int travelId;
    private int userId;
    private String username;
    private String travelTitle;
    private String hashtag;
    private LocalDateTime travelStartDate;
    private LocalDateTime travelEndDate;
    private boolean travelShareOption;
    private String travelLocationName;
    private Double travelLocationLatitude;
    private Double travelLocationLongitude;
    private String travelText;
    private int likeCount;
    private int viewCount;
    private String summary;
    

    // 기본 생성자
    public TravelDTO() {
    }

    // 필드를 초기화하는 생성자
    // Travel 객체를 받아서 초기화하는 생성자
    public TravelDTO(Travel travel) {
        this.travelId = travel.getTravelId();
        this.userId = travel.getUserId();
        this.travelTitle = travel.getTravelTitle();
        this.hashtag = travel.getHashtag();
        this.travelStartDate = travel.getTravelStartDate();
        this.travelEndDate = travel.getTravelEndDate();
        this.travelLocationName = travel.getTravelLocationName();
        this.travelLocationLatitude = travel.getTravelLocationLatitude();
        this.travelLocationLongitude = travel.getTravelLocationLongitude();
        this.travelText = travel.getTravelText();
        this.likeCount = travel.getLikeCount();
        this.viewCount = travel.getViewCount();
        this.summary = travel.getSummary();
    }

    // getter와 setter 메소드들
    public int getTravelId() {
        return travelId;
    }

    public void setTravelId(int travelId) {
        this.travelId = travelId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    

    public String getTravelTitle() {
        return travelTitle;
    }

    public void setTravelTitle(String travelTitle) {
        this.travelTitle = travelTitle;
    }

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }

    public LocalDateTime getTravelStartDate() {
        return travelStartDate;
    }

    public void setTravelStartDate(LocalDateTime travelStartDate) {
        this.travelStartDate = travelStartDate;
    }

    public LocalDateTime getTravelEndDate() {
        return travelEndDate;
    }

    public void setTravelEndDate(LocalDateTime travelEndDate) {
        this.travelEndDate = travelEndDate;
    }

    public boolean isTravelShareOption() {
        return travelShareOption;
    }

    public void setTravelShareOption(boolean travelShareOption) {
        this.travelShareOption = travelShareOption;
    }

    public String getTravelLocationName() {
        return travelLocationName;
    }

    public void setTravelLocationName(String travelLocationName) {
        this.travelLocationName = travelLocationName;
    }

    public Double getTravelLocationLatitude() {
        return travelLocationLatitude;
    }

    public void setTravelLocationLatitude(Double travelLocationLatitude) {
        this.travelLocationLatitude = travelLocationLatitude;
    }

    public Double getTravelLocationLongitude() {
        return travelLocationLongitude;
    }

    public void setTravelLocationLongitude(Double travelLocationLongitude) {
        this.travelLocationLongitude = travelLocationLongitude;
    }

    public String getTravelText() {
        return travelText;
    }

    public void setTravelText(String travelText) {
        this.travelText = travelText;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public int getViewCount() {
        return viewCount;
    }

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}

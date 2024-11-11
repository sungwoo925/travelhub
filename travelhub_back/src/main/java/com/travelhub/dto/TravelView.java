package com.travelhub.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "travel_view") // 뷰 이름
public class TravelView {

    @Id
    @Column(name = "travel_id") // 뷰의 컬럼 이름과 매핑
    private int travelId; // travel_id
    private int userId; // user_id
    private String userName; // user_name
    private String travelTitle; // travel_title
    private String hashtag; // hashtag
    private LocalDateTime travelStartDate; // travel_start_date
    private LocalDateTime travelEndDate; // travel_end_date
    private boolean travelShareOption; // travel_share_option
    private String travelLocationName; // travel_Location_Name
    private Double travelLocationLatitude; // travel_Location_Latitude
    private Double travelLocationLongitude; // travel_Location_Longitude
    private String travelText; // travel_Text
    private int likeCount; // like_count
    private int viewCount; // view_count
    private String summary; // summary

    // Getters and Setters
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
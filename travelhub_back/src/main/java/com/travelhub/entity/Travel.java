package com.travelhub.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ElementCollection;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int travelId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    @Column(nullable = false, length = 30)
    private String travelTitle;

    @Column(length = 400)
    private String hashtag;

    @Column(nullable = false)
    private LocalDateTime travelStartDate;

    @Column(nullable = false)
    private LocalDateTime travelEndDate;

    @Column(nullable = false)
    private boolean travelShareOption;

    @Column(length = 20)
    private String travelLocationName;

    private Double travelLocationLatitude;

    private Double travelLocationLongitude;

    @Column(length = 500)
    private String travelText;

    @Column(nullable = false)
    private int likeCount;

    @Column(nullable = false)
    private int viewCount;

    @Column(length = 100)
    private String summary;

    // 기본 생성자
    public Travel() {
    }

    // 요청 데이터를 바로 설정하는 생성자
    @JsonCreator
    public Travel(
        @JsonProperty("user_id") User userId,
        @JsonProperty("travel_title") String travelTitle,
        @JsonProperty("hashtag") String hashtag,
        @JsonProperty("travel_start_date") LocalDateTime travelStartDate,
        @JsonProperty("travel_end_date") LocalDateTime travelEndDate,
        @JsonProperty("travel_share_option") boolean travelShareOption,
        @JsonProperty("travel_location_name") String travelLocationName,
        @JsonProperty("travel_location_latitude") Double travelLocationLatitude,
        @JsonProperty("travel_location_longitude") Double travelLocationLongitude,
        @JsonProperty("travel_text") String travelText,
        @JsonProperty("like_count") int likeCount,
        @JsonProperty("view_count") int viewCount,
        @JsonProperty("summary") String summary) {
        this.userId = userId;
        this.travelTitle = travelTitle;
        this.hashtag = hashtag;
        this.travelStartDate = travelStartDate;
        this.travelEndDate = travelEndDate;
        this.travelShareOption = travelShareOption;
        this.travelLocationName = travelLocationName;
        this.travelLocationLatitude = travelLocationLatitude;
        this.travelLocationLongitude = travelLocationLongitude;
        this.travelText = travelText;
        this.likeCount = likeCount;
        this.viewCount = viewCount;
        this.summary = summary;
    }

    // getter와 setter 메소드들
    public int getTravelId() {
        return travelId;
    }

    public void setTravelId(int travelId) {
        this.travelId = travelId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
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

    public boolean getTravelShareOption() {
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
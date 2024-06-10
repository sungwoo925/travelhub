package com.travelhub.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int travel_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user_id;

    @Column(nullable = false, length = 30)
    private String traveltitle;

    @Column(length = 40)
    private String hashtag;

    @Column(nullable = false)
    private LocalDate travel_startdate;

    @Column(nullable = false)
    private LocalDate travel_enddate;

    @Column(nullable = false)
    private boolean travel_shareoption;

    @Column(length = 20)
    private String travel_location_name;

    private Double travel_location_latitude;

    private Double travel_location_longitude;

    @Column(length = 500)
    private String travel_text;

    @Column(nullable = false)
    private int like_count;

    @Column(nullable = false)
    private int view_count;

    @Column(length = 100)
    private String summary;

    public Travel(User user_id, String traveltitle, String hashtag, LocalDate travel_startdate, 
                  LocalDate travel_enddate, boolean travel_shareoption, String travel_location_name, 
                  Double travel_location_latitude, Double travel_location_longitude, String travel_text, 
                  int like_count, int view_count, String summary) {
        this.user_id = user_id;
        this.traveltitle = traveltitle;
        this.hashtag = hashtag;
        this.travel_startdate = travel_startdate;
        this.travel_enddate = travel_enddate;
        this.travel_shareoption = travel_shareoption;
        this.travel_location_name = travel_location_name;
        this.travel_location_latitude = travel_location_latitude;
        this.travel_location_longitude = travel_location_longitude;
        this.travel_text = travel_text;
        this.like_count = like_count;
        this.view_count = view_count;
        this.summary = summary;
    }

    // Getters and Setters
    public int getTravelId() {
        return travel_id;
    }

    public void setTravelId(int travel_id) {
        this.travel_id = travel_id;
    }

    public User getUserId() {
        return user_id;
    }

    public void setUserId(User user_id) {
        this.user_id = user_id;
    }

    public String getTraveltitle() {
        return traveltitle;
    }

    public void setTraveltitle(String traveltitle) {
        this.traveltitle = traveltitle;
    }

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }

    public LocalDate getTravelStartDate() {
        return travel_startdate;
    }

    public void setTravelStartDate(LocalDate travel_startdate) {
        this.travel_startdate = travel_startdate;
    }

    public LocalDate getTravelEndDate() {
        return travel_enddate;
    }

    public void setTravelEndDate(LocalDate travel_enddate) {
        this.travel_enddate = travel_enddate;
    }

    public boolean getTravelShareOption() {
        return travel_shareoption;
    }

    public void setTravelShareOption(boolean travel_shareoption) {
        this.travel_shareoption = travel_shareoption;
    }

    public String getTravelLocationName() {
        return travel_location_name;
    }

    public void setTravelLocationName(String travel_location_name) {
        this.travel_location_name = travel_location_name;
    }

    public Double getTravelLocationLatitude() {
        return travel_location_latitude;
    }

    public void setTravelLocationLatitude(Double travel_location_latitude) {
        this.travel_location_latitude = travel_location_latitude;
    }

    public Double getTravelLocationLongitude() {
        return travel_location_longitude;
    }

    public void setTravelLocationLongitude(Double travel_location_longitude) {
        this.travel_location_longitude = travel_location_longitude;
    }

    public String getTravelText() {
        return travel_text;
    }

    public void setTravelText(String travel_text) {
        this.travel_text = travel_text;
    }

    public int getLikeCount() {
        return like_count;
    }

    public void setLikeCount(int like_count) {
        this.like_count = like_count;
    }

    public int getViewCount() {
        return view_count;
    }

    public void setViewCount(int view_count) {
        this.view_count = view_count;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
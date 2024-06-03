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

}
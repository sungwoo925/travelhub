package com.example.demo.entity;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.TemporalType;
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

}
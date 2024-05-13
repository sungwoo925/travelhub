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
public class Journal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int journal_id;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    private Travel travel_id;

    @Column(length = 400)
    private String journal_text;

    @Column
    private LocalDate journal_date;

    @Column(length = 20)
    private String journal_location_name;

    @Column(length = 20)
    private String journal_location_latitude;

    @Column(length = 20)
    private String journal_location_longitude;

    @Column(length = 40)
    private String photo_link;

    @Column
    private short sequence_info;

}


package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class User {

    // @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    // private int user_id;

    // @Column(length = 50, nullable = false)
    // private String user_name;

    // @Column(length = 20, nullable = false)
    // private String user_password;

    // @Column(length = 11, nullable = false)
    // private String user_phoneNum;

    // @Column(nullable = false)
    // private LocalDate birthday;

    // @Column(length = 2)
    // private String sex;

    // @Column(nullable = false)
    // private LocalDate registrationDate;

}

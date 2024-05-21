package com.travelhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    @Column(length = 50, nullable = false)
    private String user_name;

    @Column(length = 20, nullable = false)
    private String user_password;

    @Column(length = 11, nullable = false)
    private String user_phoneNum;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(length = 2)
    private String sex;

    @Column(nullable = false)
    private LocalDate registrationDate;

    public void showme(){
        System.out.println(user_id);
        System.out.println(user_name);
    }

    // 요청 데이터를 바로 설정하는 생성자
    public User(String user_name, String user_password, String user_phoneNum, LocalDate birthday, String sex) {
        this.user_name = user_name;
        this.user_password = user_password;
        this.user_phoneNum = user_phoneNum;
        this.birthday = birthday;
        this.sex = sex;
        this.registrationDate = LocalDate.now(); // 등록 날짜 설정
    }
}

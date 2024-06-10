package com.travelhub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    @Column(length = 50, nullable = false)
    private String userName;

    @Column(length = 255, nullable = false)
    private String user_password;

    @Column(length = 11, nullable = false)
    private String user_phone_num;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(length = 2)
    private String sex;

    @Column(nullable = false)
    private LocalDate registrationDate;

    // 기본 생성자 추가
    public User() {
    }

    // 요청 데이터를 바로 설정하는 생성자
    @JsonCreator
    public User(
        @JsonProperty("userName") String userName,
        @JsonProperty("user_password") String user_password,
        @JsonProperty("user_phone_num") String user_phone_num,
        @JsonProperty("birthday") LocalDate birthday,
        @JsonProperty("sex") String sex) {
        this.userName = userName;
        this.user_password = user_password;
        this.user_phone_num = user_phone_num;
        this.birthday = birthday;
        this.sex = sex;
        this.registrationDate = LocalDate.now(); // 등록 날짜 설정
    }

    // 사용자 정보 업데이트를 위한 메소드
    public void updateUserDetails(String userName, String user_password, String user_phoneNum, LocalDate birthday, String sex) {
        this.userName = userName;
        this.user_password = user_password;
        this.user_phone_num = user_phone_num;
        this.birthday = birthday;
        this.sex = sex;
    }

    // 사용자 이름을 반환하는 메소드
    public String getUserName() {
        return userName;
    }

    // 사용자 이름을 설정하는 메소드
    public void setUsername(String userName) {
        this.userName = userName;
    }

    // 사용자 비밀번호를 반환하는 메소드
    public String getPassword() {
        return user_password;
    }

    // 사용자 비밀번호를 설정하는 메소드
    public void setPassword(String user_password) {
        this.user_password = user_password;
    }
}
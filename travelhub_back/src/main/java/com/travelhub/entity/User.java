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
    private int userId;

    @Column(length = 50, nullable = false)
    private String userName;

    @Column(length = 255, nullable = false)
    private String userPassword;

    @Column(length = 11, nullable = false)
    private String userPhoneNum;

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
        @JsonProperty("user_name") String userName,
        @JsonProperty("user_password") String userPassword,
        @JsonProperty("user_phone_num") String userPhoneNum,
        @JsonProperty("birthday") LocalDate birthday,
        @JsonProperty("sex") String sex) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.userPhoneNum = userPhoneNum;
        this.birthday = birthday;
        this.sex = sex;
        this.registrationDate = LocalDate.now(); // 등록 날짜 설정
    }

    // 사용자 정보 업데이트를 위한 메소드
    public void updateUserDetails(String userName, String userPassword, String userPhoneNum, LocalDate birthday, String sex) {
        this.userName = userName;
        this.userPassword = userPassword;
        this.userPhoneNum = userPhoneNum;
        this.birthday = birthday;
        this.sex = sex;
    }

    // 사용자 이름을 반환하는 메소드
    public String getUserName() {
        return userName;
    }

    // 사용자 이름을 설정하는 메소드
    public void setUserName(String userName) {
        this.userName = userName;
    }

    // 사용자 비밀번호를 반환하는 메소드
    public String getUserPassword() {
        return userPassword;
    }

    // 사용자 비밀번호를 설정하는 메소드
    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    // 사용자 전화번호를 반환하는 메소드
    public String getUserPhoneNum() {
        return userPhoneNum;
    }

    // 사용자 전화번호를 설정하는 메소드
    public void setUserPhoneNum(String userPhoneNum) {
        this.userPhoneNum = userPhoneNum;
    }

    // 생일을 반환하는 메소드
    public LocalDate getBirthday() {
        return birthday;
    }

    // 생일을 설정하는 메소드
    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    // 성별을 반환하는 메소드
    public String getSex() {
        return sex;
    }

    // 성별을 설정하는 메소드
    public void setSex(String sex) {
        this.sex = sex;
    }

    // 등록 날짜를 반환하는 메소드
    public LocalDate getRegistrationDate() {
        return registrationDate;
    }

    // 등록 날짜를 설정하는 메소드
    public void setRegistrationDate(LocalDate registrationDate) {
        this.registrationDate = registrationDate;
    }

    // Getter와 Setter 메소드들
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
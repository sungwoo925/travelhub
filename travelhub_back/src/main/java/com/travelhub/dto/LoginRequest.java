package com.travelhub.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
    private String userEmail;
    private String userPassword;

    // 기본 생성자
    public LoginRequest() {
    }

    // 매개변수가 있는 생성자
    @JsonCreator    
    public LoginRequest(
        @JsonProperty("user_email") String userEmail,
        @JsonProperty("user_password") String userPassword){
        this.userEmail = userEmail;
        this.userPassword = userPassword;
    }

    // getter와 setter 메서드
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
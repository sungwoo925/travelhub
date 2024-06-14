package com.travelhub.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
    private String userName;
    private String userPassword;

    // 기본 생성자
    public LoginRequest() {
    }

    // 매개변수가 있는 생성자
    @JsonCreator    
    public LoginRequest(
        @JsonProperty("user_name") String userName,
        @JsonProperty("user_password") String userPassword){

        this.userName = userName;
        this.userPassword = userPassword;
    }

    // getter와 setter 메서드
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }
}
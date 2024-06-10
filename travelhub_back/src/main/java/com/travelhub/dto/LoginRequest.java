package com.travelhub.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
    private String userName;
    private String user_password;

    // 기본 생성자
    public LoginRequest() {
    }

    // 매개변수가 있는 생성자
    @JsonCreator    
    public LoginRequest(
        @JsonProperty("userName") String userName,
        @JsonProperty("user_password") String user_password){
            
        this.userName = userName;
        this.user_password = user_password;
    }

    // getter와 setter 메서드
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }
}
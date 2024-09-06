package com.travelhub.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class JournalUpdateDTO {
    private LocalDate journalDate;
    private String journalText;
    private String journalLocationName;
    private String journalLocationLatitude;
    private String journalLocationLongitude; // 오타 수정
    private String weather; // 변수명 소문자로 수정
    private short sequenceInfo;

    // JSON 생성자
    @JsonCreator
    public JournalUpdateDTO(
        @JsonProperty("journal_date") LocalDate journalDate,
        @JsonProperty("journal_text") String journalText,
        @JsonProperty("journal_location_name") String journalLocationName,
        @JsonProperty("journal_location_latitude") String journalLocationLatitude,
        @JsonProperty("journal_location_longitude") String journalLocationLongitude,
        @JsonProperty("weather") String weather,
        @JsonProperty("sequence_info") short sequenceInfo) {
        
        this.journalDate = journalDate;
        this.journalText = journalText;
        this.journalLocationName = journalLocationName;
        this.journalLocationLatitude = journalLocationLatitude;
        this.journalLocationLongitude = journalLocationLongitude;
        this.weather = weather;
        this.sequenceInfo = sequenceInfo;
    }
    
    // Getter와 Setter 메소드들
    public LocalDate getJournalDate() {
        return journalDate;
    }

    public void setJournalDate(LocalDate journalDate) {
        this.journalDate = journalDate;
    }

    public String getJournalText() {
        return journalText;
    }

    public void setJournalText(String journalText) {
        this.journalText = journalText;
    }

    public String getJournalLocationName() {
        return journalLocationName;
    }

    public void setJournalLocationName(String journalLocationName) {
        this.journalLocationName = journalLocationName;
    }

    public String getJournalLocationLatitude() {
        return journalLocationLatitude;
    }

    public void setJournalLocationLatitude(String journalLocationLatitude) {
        this.journalLocationLatitude = journalLocationLatitude;
    }

    public String getJournalLocationLongitude() {
        return journalLocationLongitude;
    }

    public void setJournalLocationLongitude(String journalLocationLongitude) {
        this.journalLocationLongitude = journalLocationLongitude;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public short getSequenceInfo() {
        return sequenceInfo;
    }

    public void setSequenceInfo(short sequenceInfo) {
        this.sequenceInfo = sequenceInfo;
    }
}
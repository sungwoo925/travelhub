package com.travelhub.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Journal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int journalId;

    @ManyToOne
    @JoinColumn(name = "travel_id", nullable = false)
    private Travel travelId;

    @Column(length = 400)
    private String journalText;

    @Column
    private LocalDate journalDate;

    @Column(length = 20)
    private String journalLocationName;

    @Column(length = 20)
    private String journalLocationLatitude;

    @Column(length = 20)
    private String journalLocationLongitude;

    @Column(length = 40)
    private String photoLink;

    @Column(length = 40)
    private String Weather;

    @Column
    private short sequenceInfo;

    // 기본 생성자
    public Journal() {
    }

    // 요청 데이터를 바로 설정하는 생성자
    @JsonCreator
    public Journal(
        @JsonProperty("travel_id") Travel travelId,
        @JsonProperty("journal_text") String journalText,
        @JsonProperty("journal_date") LocalDate journalDate,
        @JsonProperty("journal_location_name") String journalLocationName,
        @JsonProperty("journal_location_latitude") String journalLocationLatitude,
        @JsonProperty("journal_location_longitude") String journalLocationLongitude,
        @JsonProperty("photo_link") String photoLink,
        @JsonProperty("weather") String Weather,
        @JsonProperty("sequence_info") short sequenceInfo) {
        this.travelId = travelId;
        this.journalText = journalText;
        this.journalDate = journalDate;
        this.journalLocationName = journalLocationName;
        this.journalLocationLatitude = journalLocationLatitude;
        this.journalLocationLongitude = journalLocationLongitude;
        this.photoLink = photoLink;
        this.sequenceInfo = sequenceInfo;
    }

    // Getter와 Setter 메소드들
    public String getweather() {
        return Weather;
    }

    public void setWeather(String Weather) {
        this.Weather = Weather;
    }
    public int getJournalId() {
        return journalId;
    }

    public void setJournalId(int journalId) {
        this.journalId = journalId;
    }

    public Travel getTravelId() {
        return travelId;
    }

    public void setTravelId(Travel travelId) {
        this.travelId = travelId;
    }

    public String getJournalText() {
        return journalText;
    }

    public void setJournalText(String journalText) {
        this.journalText = journalText;
    }

    public LocalDate getJournalDate() {
        return journalDate;
    }

    public void setJournalDate(LocalDate journalDate) {
        this.journalDate = journalDate;
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

    public String getPhotoLink() {
        return photoLink;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public short getSequenceInfo() {
        return sequenceInfo;
    }

    public void setSequenceInfo(short sequenceInfo) {
        this.sequenceInfo = sequenceInfo;
    }
}
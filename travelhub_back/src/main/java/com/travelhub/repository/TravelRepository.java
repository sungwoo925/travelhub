package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.travelhub.entity.Travel;
import com.travelhub.entity.User;

import java.util.List;
import java.util.Optional;

public interface TravelRepository extends JpaRepository<Travel, Long> {
    List<Travel> findByHashtagContaining(String hashtag);
    List<Travel> findByTravelTitleContaining(String travelTitle);
    List<Travel> findByUserIdAndTravelLocationLatitude(Integer userId, Double travelLocationLatitude);
    List<Travel> findByTravelShareOption(Boolean travelShareOption);

    Optional<Travel> findByTravelId(Integer id);

    
}
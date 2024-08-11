package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Travel;

import java.util.List;
import java.util.Optional;

public interface TravelRepository extends JpaRepository<Travel, Long> {
    List<Travel> findByHashtagContaining(String hashtag);
    List<Travel> findByTravelTitleContaining(String travelTitle);
    
    Optional<Travel> findById(Long id);
}
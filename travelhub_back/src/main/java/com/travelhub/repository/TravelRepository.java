package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Travel;
import java.util.List; 

public interface TravelRepository extends JpaRepository<Travel, Long> {
    List<Travel> findByHashtagContaining(String hashtag);
    List<Travel> findByTraveltitleContaining(String traveltitle);
}

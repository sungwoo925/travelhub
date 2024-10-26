package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Journal;
import com.travelhub.entity.Travel;

import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    List<Journal> findByTravelId(Integer travelId); // travelId로 Journal 찾기
}

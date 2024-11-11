package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelhub.dto.TravelView;

public interface TravelViewRepository extends JpaRepository<TravelView, Integer> {
    // 추가적인 쿼리 메서드 정의 가능
}
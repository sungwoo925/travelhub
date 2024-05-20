package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.Journal;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    // 여기에 사용자 관련 메서드 추가 가능
}

package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String userName);
    Optional<User> findByUserId(Long userId);
    Optional<User> findByUserEmail(String userEmail);
}

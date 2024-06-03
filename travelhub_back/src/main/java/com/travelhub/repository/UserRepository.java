package com.travelhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.travelhub.entity.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

}

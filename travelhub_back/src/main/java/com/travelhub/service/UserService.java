package com.travelhub.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.travelhub.entity.User;
import com.travelhub.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getUserById(Integer userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> updateUser(Integer userId, User userDetails) {
        return userRepository.findById(userId).map(user -> {
            user.setUserName(userDetails.getUserName());
            user.setUserPassword(userDetails.getUserPassword()); // 비밀번호는 암호화 필요
            return userRepository.save(user);
        });
    }
}


package com.vs.auth.service;

import com.vs.auth.model.User;
import com.vs.auth.repo.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User findOrCreateByMobile(String mobile){
        Optional<User> u = userRepository.findByMobile(mobile);
        if(u.isPresent()) return u.get();
        User n = new User(mobile);
        return userRepository.save(n);
    }

    public Optional<User> findByMobile(String mobile){
        return userRepository.findByMobile(mobile);
    }
}

package com.example.eapteka;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Page<User> getAllUsers(Pageable pageable){
        return userRepository.findAll(pageable);
    }

    public Long save(User user){
        System.out.println(userRepository.saveAndFlush(user).getId());
        return userRepository.saveAndFlush(user).getId();
    }

}

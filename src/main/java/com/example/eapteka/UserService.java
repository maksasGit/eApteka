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
        return userRepository.saveAndFlush(user).getId();
    }
    public String delete(Long id) {
        if (userRepository.findById(id).isEmpty()) {
            return "Not Found";
        } else {
            userRepository.deleteById(id);
            return "Deleted";
        }
    }
}

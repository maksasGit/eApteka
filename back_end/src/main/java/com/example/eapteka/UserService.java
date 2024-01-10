package com.example.eapteka;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // ##################################
    // #################################
    // POST
    // ##################################
    // ##################################

    public User createNewUser(User user) {
        return userRepository.save(user);
    }


    // ##################################
    // #################################
    // GET
    // ##################################
    // ##################################


    public boolean existsByUsernameOrEmail(String username, String email) {
        return userRepository.existsByUsernameOrEmail(username, email);
    }



    public Page<User> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public User getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }


    // ##################################
    // #################################
    // PUT
    // ##################################
    // ##################################

    public User updateUserDetails(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        if (userDetails.getUsername() != null){
            updateUserUsername(id, userDetails.getUsername());
        }
        if (userDetails.getPassword() != null){
            updateUserPassword(id, userDetails.getPassword());
        }
        if (userDetails.getEmail() != null){
            updateUserEmail(id, userDetails.getEmail());
        }
        return userRepository.save(user);
    }

    public User updateUserUsername(Long id, String username) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        user.setUsername(username);
        return userRepository.save(user);
    }

    public User updateUserPassword(Long id, String password) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        user.setPassword(password);
        return userRepository.save(user);
    }

    public User updateUserEmail(Long id, String email) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        user.setEmail(email);
        return userRepository.save(user);
    }


    // ##################################
    // #################################
    // DELETE
    // ##################################
    // ##################################


    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

}

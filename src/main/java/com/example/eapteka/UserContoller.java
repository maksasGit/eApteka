package com.example.eapteka;


import com.example.eapteka.User;
import com.example.eapteka.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserContoller {

    private final UserService userService;

    @GetMapping("/users")
    public Page<User> getAll(Pageable pageable){
        return userService.getAllUsers(pageable);
    }


    @GetMapping("/health")
    public String checkHealth() {
        return "Application is up and running!";
    }

    @PostMapping("/user")
    public Long save(@RequestBody User user){
       return userService.save(user);
    }

}

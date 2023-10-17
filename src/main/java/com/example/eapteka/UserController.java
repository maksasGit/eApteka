package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

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

    @PostMapping("/userdel")
    public String delete(@RequestParam Long id){
        return userService.delete(id);
        //return new RedirectView("/users", true);
    }

}

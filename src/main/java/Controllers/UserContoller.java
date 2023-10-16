package Controllers;


import Entity.User;
import Services.UserService;
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


    @PostMapping("/user")
    public void save(@RequestBody User user){
        userService.save(user);

    }

}

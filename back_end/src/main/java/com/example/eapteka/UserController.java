package com.example.eapteka;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Разрешить запросы со всех доменов
public class UserController {

    private final UserService userService;

    //private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(userService.getAllUsers(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("success " + user.toString());
        return ResponseEntity.ok(userService.createNewUser(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUserDetails(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

}
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody User user) {
//        User existingUser = userService.getUserByUsername(user.getUsername());
//        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
//            return ResponseEntity.ok("User authenticated successfully");
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//    }
//
//}

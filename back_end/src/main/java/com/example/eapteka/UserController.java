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
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Перевірка, чи існує користувач з таким ім'ям користувача або електронною поштою
        boolean userExists = userService.existsByUsernameOrEmail(user.getUsername(), user.getEmail());
        if (userExists) {
            // Якщо такий користувач вже існує, повернути відповідь з помилкою
            return ResponseEntity.badRequest().body("User already exists with given username or email");
        }
        // Якщо користувача не існує, створити нового
        User createdUser = userService.createNewUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
    // Check if a user with the provided username and password exists
    User existingUser = userService.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    if (existingUser == null) {
        // If no such user exists, return an error response
        return ResponseEntity.badRequest().body("Invalid username or password");
    }
    // If the user exists, return the user data
    return ResponseEntity.ok(existingUser);
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

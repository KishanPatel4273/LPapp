package com.spencergifts.lp.lpdb.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{user_id}")
    ResponseEntity<User> findById(@PathVariable long user_id) {
        Optional<User> user = userService.findById(user_id);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(user.get());
    }

    @PostMapping
    ResponseEntity<User> create(@RequestBody User user) {
        try {
            userService.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/{id}")
    ResponseEntity<User> update(@RequestBody User user, @PathVariable long id) {
        // only updates admin and active status and name and email are from oauth2
        Optional<User> _user = userService.findById(id);

        if (_user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        this.userService.update(user, id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}

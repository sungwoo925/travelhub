package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    // @Autowired
    // private UserService userService;

    // @GetMapping
    // public ResponseEntity<List<User>> getAllUsers() {
    //     List<User> users = userService.getAllUsers();
    //     return ResponseEntity.ok(users);
    // }

    // @GetMapping("/{userId}")
    // public ResponseEntity<User> getUserById(@PathVariable Long userId) {
    //     User user = userService.getUserById(userId);
    //     if (user != null) {
    //         return ResponseEntity.ok(user);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }
    // }

    // @PostMapping
    // public ResponseEntity<User> createUser(@RequestBody User user) {
    //     User newUser = userService.saveUser(user);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    // }

    // @PutMapping("/{userId}")
    // public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
    //     User updatedUser = userService.saveUser(user);
    //     return ResponseEntity.ok(updatedUser);
    // }

    // @DeleteMapping("/{userId}")
    // public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
    //     userService.deleteUser(userId);
    //     return ResponseEntity.noContent().build();
    // }
}

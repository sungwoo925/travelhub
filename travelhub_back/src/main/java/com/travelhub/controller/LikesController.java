package com.travelhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.travelhub.dto.LikesDTO;
import com.travelhub.entity.Likes;
import com.travelhub.entity.User;
import com.travelhub.entity.Travel;
import com.travelhub.service.LikesService;

import java.util.List;

@RestController
@RequestMapping("/likes")
public class LikesController {

    @Autowired
    private LikesService likesService;

    @PostMapping
    public ResponseEntity<?> addLike(@RequestBody LikesDTO likesDTO) {
        User user = new User();
        user.setUserId(likesDTO.getUserId());
        Travel travel = new Travel();
        travel.setTravelId(likesDTO.getTravelId());
        Likes like = new Likes(user, travel);
        likesService.addLike(like);
        return ResponseEntity.ok().body("{\"status\": 200}");
    }

    @DeleteMapping("/{likeId}")
    public ResponseEntity<?> removeLike(@PathVariable int likeId) {
        likesService.removeLike(likeId);
        return ResponseEntity.ok().body("{\"status\": 200}");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Integer>> getLikesByUser(@PathVariable int userId) {
        User user = new User();
        user.setUserId(userId);
        List<Integer> travelIds = likesService.getLikesByUser(user);
        return ResponseEntity.ok(travelIds);
    }

}
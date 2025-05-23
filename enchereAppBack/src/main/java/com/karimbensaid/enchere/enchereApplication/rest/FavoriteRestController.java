package com.karimbensaid.enchere.enchereApplication.rest;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.repository.UserRepository;
import com.karimbensaid.enchere.enchereApplication.service.AuctionService;
import com.karimbensaid.enchere.enchereApplication.service.FavoriteService;
import com.karimbensaid.enchere.enchereApplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@AllArgsConstructor
public class FavoriteRestController {
    private FavoriteService favoriteService;
    private final UserService userService;
    private final AuctionService auctionService;

    @PostMapping("/{auctionId}")
    public ResponseEntity<?> toggleFavorite(@PathVariable int auctionId) {
        User user = userService.getCurrentUser();
        Auction auction = auctionService.getAuctionById(auctionId);
        favoriteService.toggleFavorite(user,auction);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Auction>> getFavorites() {
        return ResponseEntity.ok(favoriteService.getFavorites());
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<Boolean> isFavorite(@PathVariable int auctionId) {
        return ResponseEntity.ok(favoriteService.isFavorite(auctionId));
    }


}

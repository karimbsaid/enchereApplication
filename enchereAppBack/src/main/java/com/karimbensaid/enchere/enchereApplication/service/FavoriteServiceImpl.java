package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {
    UserService userService;


    @Override
    public void toggleFavorite(User user, Auction auction) {
        if(user.getFavoriteAuctions().contains(auction)){
            user.getFavoriteAuctions().remove(auction);
        }else {
            user.getFavoriteAuctions().add(auction);
        }
        userService.save(user);
    }

    @Override
    public List<Auction> getFavorites() {
        return userService.getCurrentUser().getFavoriteAuctions();
    }

    @Override
    public Boolean isFavorite(int auctionId) {
        User currentUser = userService.getCurrentUser();
        return currentUser.getFavoriteAuctions().stream()
                .anyMatch(a -> a.getId() == auctionId);
    }

}
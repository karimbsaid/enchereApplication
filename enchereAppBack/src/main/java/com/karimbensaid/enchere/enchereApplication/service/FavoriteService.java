package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.User;

import java.util.List;

public interface FavoriteService {
    void toggleFavorite(User user, Auction auction) ;
    List<Auction> getFavorites();
    Boolean isFavorite(int auctionId);

}
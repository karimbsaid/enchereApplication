package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.Bid;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface BidService {
    Bid placeBid(int auctionId, int userId, double amount);
    List<Auction> getMyBiddedAuctions(int bidderId);

}

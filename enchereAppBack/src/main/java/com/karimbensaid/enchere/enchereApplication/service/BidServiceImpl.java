package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.Bid;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.repository.AuctionRepository;
import com.karimbensaid.enchere.enchereApplication.repository.BidRepository;
import com.karimbensaid.enchere.enchereApplication.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@AllArgsConstructor
public class BidServiceImpl implements BidService{

    private BidRepository bidRepository;
    private AuctionRepository auctionRepository;
    private UserRepository userRepository ;
    private final Map<Integer, Object> auctionLocks = new ConcurrentHashMap<>();


    @Override
    public Bid placeBid(int auctionId, int userId, double amount) {
        Object lock = auctionLocks.computeIfAbsent(auctionId, k -> new Object());

        synchronized (lock) {
            Auction auction = auctionRepository.findById(auctionId)
                    .orElseThrow(() -> new EntityNotFoundException("Auction not found with ID: " + auctionId));

            if (LocalDateTime.now().isAfter(auction.getEndTime())) {
                throw new IllegalStateException("The auction has already ended.");
            }

            User bidder = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));

            double currentHighest = auction.getBids().stream()
                    .mapToDouble(Bid::getAmount)
                    .max()
                    .orElse(auction.getStartPrice());

            if (amount <= currentHighest) {
                throw new IllegalArgumentException("Your bid must be higher than the current highest bid: " + currentHighest);
            }

            Bid newBid = new Bid();
            newBid.setAmount(amount);
            newBid.setAuction(auction);
            newBid.setBidder(bidder);
            return bidRepository.save(newBid);
        }
    }

    @Override
    public List<Auction> getMyBiddedAuctions(int bidderId) {
        return bidRepository.findDistinctAuctionsByBidderId(bidderId);
    }



}

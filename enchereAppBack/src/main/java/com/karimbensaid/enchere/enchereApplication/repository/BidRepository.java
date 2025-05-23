package com.karimbensaid.enchere.enchereApplication.repository;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid,Integer> {

    @Query("SELECT DISTINCT b.auction FROM Bid b WHERE b.bidder.id = :userId")
    List<Auction> findDistinctAuctionsByBidderId(@Param("userId") int userId);

}

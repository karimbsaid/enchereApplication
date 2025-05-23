package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;

public interface AuctionService {

    @Transactional

    Auction createAuction(Auction auction);
    Auction getAuctionById(int id);
    Auction updateAuction(Auction auction);
    public Page<Auction> getAuctionsWithFilters(Double minPrice, Double maxPrice, String category, String condition,String search ,Pageable pageable) ;

    void deleteAuction(int id) throws IOException;

    List<Auction> getAuctionBySellerId(int sellerId);
    public List<Auction> getAuctionsByCategory(int categoryId) ;
    public List<Auction> getAuctionsByCondition(int conditionId);


    }

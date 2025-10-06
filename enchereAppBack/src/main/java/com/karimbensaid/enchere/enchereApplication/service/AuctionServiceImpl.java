package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.AuctionImage;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.repository.AuctionRepository;
import com.karimbensaid.enchere.enchereApplication.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuctionServiceImpl implements AuctionService{
    private AuctionRepository auctionRepository;
    private UserRepository userRepository;
    private ImageUploadService imageUploadService;


    @Transactional
    @Override
    public Auction createAuction(Auction auction) {
         return auctionRepository.save(auction);

    }

    @Override
    public Auction getAuctionById(int id) {
        return auctionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Auction not found"));
    }



    @Transactional
    @Override
    public Auction updateAuction(Auction auction) {
        return auctionRepository.save(auction);
    }

    @Override
    public Page<Auction> getAuctionsWithFilters(Double minPrice, Double maxPrice, String category, String condition, String search, Pageable pageable) {
        List<String> conditionList = (condition != null && !condition.isEmpty())
                ? Arrays.asList(condition.split(","))
                : null;

        List<String> categoryList = (category != null && !category.isEmpty())
                ? Arrays.asList(category.split(","))
                : null;

        return auctionRepository.findAuctionsWithFilters(minPrice, maxPrice, categoryList, conditionList, search, pageable);
    }



    @Transactional
    @Override
    public void deleteAuction(int auctionId) throws IOException {
        Optional<Auction> auctionOpt = auctionRepository.findById(auctionId);
        if (auctionOpt.isEmpty()) {
            throw new IllegalArgumentException("Auction not found with ID: " + auctionId);
        }
        Auction auction = auctionOpt.get();

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!auction.getSeller().getEmail().equals(currentUserEmail)) {
            throw new SecurityException("You are not authorized to delete this auction.");
        }

        if (auction.getBids() != null && !auction.getBids().isEmpty()) {
            throw new IllegalStateException("Cannot delete auction with existing bids.");
        }


        if (auction.getImages() != null) {
            for (AuctionImage image : auction.getImages()) {
                if (image.getImageUrl() != null) {
                    imageUploadService.deleteImage(image.getImageUrl());
                }
            }
        }

        if (auction.getFavoritedByUsers() != null) {
            auction.getFavoritedByUsers().clear();
        }

        auctionRepository.delete(auction);
    }

    @Override
    public List<Auction> getAuctionBySellerId(int sellerId) {
        return auctionRepository.getAuctionsBySellerId(sellerId);
    }



    @Override
    public List<Auction> getAuctionsByCategory(int categoryId) {
        return auctionRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<Auction> getAuctionsByCondition(int conditionId) {
        return auctionRepository.findByConditionId(conditionId);
    }


}

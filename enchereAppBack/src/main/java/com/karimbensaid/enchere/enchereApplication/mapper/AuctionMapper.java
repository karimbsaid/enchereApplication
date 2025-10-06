package com.karimbensaid.enchere.enchereApplication.mapper;


import com.karimbensaid.enchere.enchereApplication.dto.*;
import com.karimbensaid.enchere.enchereApplication.entity.Auction;
import com.karimbensaid.enchere.enchereApplication.entity.AuctionImage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuctionMapper {
    public AuctionResponseDto convertToAuctionResponseDto(Auction auction) {
        CategoriesDto categoryDto = new CategoriesDto();
        categoryDto.setId(auction.getCategory().getId());
        categoryDto.setName(auction.getCategory().getName());

        ConditionDto conditionDto = new ConditionDto();
        conditionDto.setId(auction.getCondition().getId());
        conditionDto.setName(auction.getCondition().getName());

        List<UserDto> favoritedUsers = auction.getFavoritedByUsers() != null
                ? auction.getFavoritedByUsers().stream()
                .map(user -> new UserDto(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .collect(Collectors.toList())
                : new ArrayList<>();

        return new AuctionResponseDto(
                auction.getId(),
                auction.getTitle(),
                auction.getDescription(),
                auction.getStartPrice(),
                auction.getEndTime(),
                new UserDto(
                        auction.getSeller().getId(),
                        auction.getSeller().getUsername(),
                        auction.getSeller().getEmail()
                ),
                auction.getImages() != null ? auction.getImages().stream()
                        .map(AuctionImage::getImageUrl)
                        .collect(Collectors.toList()) : new ArrayList<>(),
                auction.getBids() != null ? auction.getBids().stream()
                        .map(bid -> new BidDto(
                                bid.getId(),
                                bid.getAmount(),
                                new UserDto(
                                        bid.getBidder().getId(),
                                        bid.getBidder().getUsername(),
                                        bid.getBidder().getEmail()
                                ),
                                bid.getCreatedAt()
                        ))
                        .collect(Collectors.toList()) : new ArrayList<>(),
                conditionDto,
                categoryDto,
                favoritedUsers
        );
    }

}

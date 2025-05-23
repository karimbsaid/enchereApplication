package com.karimbensaid.enchere.enchereApplication.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AuctionResponseDto {
    private Integer id;
    private String title;
    private String description;
    private Double startPrice;
    private LocalDateTime endTime;
    private CategoriesDto category;
    private ConditionDto condition;
    private UserDto seller;
    private List<String> imageUrls;
    private List<BidDto> bids;
    private List<UserDto> favoritedByUsers;


    public AuctionResponseDto(Integer id, String title, String description, Double startPrice, LocalDateTime endTime,
                              UserDto seller, List<String> imageUrls, List<BidDto> bids, ConditionDto condition, CategoriesDto category,List<UserDto> favoritedByUsers
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startPrice = startPrice;
        this.endTime = endTime;
        this.seller = seller;
        this.imageUrls = imageUrls;
        this.bids = bids;
        this.condition = condition;
        this.category = category;
        this.favoritedByUsers = favoritedByUsers;

    }
}
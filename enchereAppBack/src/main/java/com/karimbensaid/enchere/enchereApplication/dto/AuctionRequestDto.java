package com.karimbensaid.enchere.enchereApplication.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionRequestDto {
    private String title;
    private String description;
    private Double startPrice;
    private LocalDateTime endTime;
    private Integer category;
    private Integer condition;
}



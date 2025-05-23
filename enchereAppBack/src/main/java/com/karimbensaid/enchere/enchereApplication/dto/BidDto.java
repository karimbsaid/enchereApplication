package com.karimbensaid.enchere.enchereApplication.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class BidDto {
    private int id;
    private double amount;
    private UserDto bidder;
    private LocalDateTime createdAt;

}

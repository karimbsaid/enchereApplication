package com.karimbensaid.enchere.enchereApplication.dto;

import lombok.Data;

@Data
public class SignupDTO {
    private String username;
    private String email;    // Added email field
    private String password;
}

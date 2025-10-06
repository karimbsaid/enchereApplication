package com.karimbensaid.enchere.enchereApplication.dto;

import lombok.Data;

@Data
public class LoginDTO {
    private String email;    // Changed from username
    private String password;
}

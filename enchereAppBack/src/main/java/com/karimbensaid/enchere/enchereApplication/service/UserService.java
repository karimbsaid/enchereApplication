package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.User;
import org.springframework.stereotype.Service;

public interface UserService {

    User getCurrentUser();
    void save(User user);

}

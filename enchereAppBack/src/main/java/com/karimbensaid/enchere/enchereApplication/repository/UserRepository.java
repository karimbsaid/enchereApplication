package com.karimbensaid.enchere.enchereApplication.repository;

import com.karimbensaid.enchere.enchereApplication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);


}

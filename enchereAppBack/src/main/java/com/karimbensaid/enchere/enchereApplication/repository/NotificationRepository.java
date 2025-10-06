package com.karimbensaid.enchere.enchereApplication.repository;

import com.karimbensaid.enchere.enchereApplication.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {

}

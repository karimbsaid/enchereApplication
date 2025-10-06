package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Notification;

import java.util.List;
import java.util.Optional;

public interface NotificationService {



    Notification createNotification(Notification notification);
    List<Notification> getUserNotification(int userId);
    Optional<Notification> getNotificationById(int notificationId);
    Notification markasView (Notification notification);
}

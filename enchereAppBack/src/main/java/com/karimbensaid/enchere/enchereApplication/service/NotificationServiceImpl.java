package com.karimbensaid.enchere.enchereApplication.service;

import com.karimbensaid.enchere.enchereApplication.entity.Notification;
import com.karimbensaid.enchere.enchereApplication.repository.NotificationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationServiceImpl implements NotificationService{
    private NotificationRepository notificationRepository;
    private UserService userService;
    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getUserNotification(int userId) {
        return userService.getCurrentUser().getNotifications();
    }

    @Override
    public Optional<Notification> getNotificationById(int notificationId) {
        return notificationRepository.findById(notificationId);
    }

    @Override
    public Notification markasView(Notification notification) {
        return notificationRepository.save(notification);
    }
}

package com.karimbensaid.enchere.enchereApplication.rest;

import com.karimbensaid.enchere.enchereApplication.entity.Notification;
import com.karimbensaid.enchere.enchereApplication.entity.User;
import com.karimbensaid.enchere.enchereApplication.service.NotificationService;
import com.karimbensaid.enchere.enchereApplication.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationRestController {
    private final  NotificationService notificationService;
    private final UserService userService;


    @GetMapping("")
    public List<Notification> getUserNotifications() {
        User currentUser = userService.getCurrentUser();
        return notificationService.getUserNotification(currentUser.getId());
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> markAsViewed(@PathVariable int id) {
        Notification notification = notificationService.getNotificationById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found"));

        notification.setViewed(true);
        notificationService.markasView(notification);

        return ResponseEntity.ok().build();
    }


}

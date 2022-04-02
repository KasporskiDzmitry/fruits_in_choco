package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Notification;

import java.util.List;

public interface NotificationService {
    List<Notification> getAllUnwatchedNotifications();
    void deleteNotificationById(Long id);
}

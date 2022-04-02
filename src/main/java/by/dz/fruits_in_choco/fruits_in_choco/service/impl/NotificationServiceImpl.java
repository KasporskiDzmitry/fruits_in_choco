package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Notification;
import by.dz.fruits_in_choco.fruits_in_choco.repository.NotificationRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("notificationService")
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository repository;

    public NotificationServiceImpl(NotificationRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Notification> getAllUnwatchedNotifications() {
        return repository.findAll();
    }

    @Override
    public void deleteNotificationById(Long id) {
        repository.deleteById(id);
    }
}

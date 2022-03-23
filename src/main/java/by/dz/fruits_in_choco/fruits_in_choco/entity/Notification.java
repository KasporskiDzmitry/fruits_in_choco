package by.dz.fruits_in_choco.fruits_in_choco.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Date date;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "type", columnDefinition = "ENUM('ORDER', 'REVIEW')", nullable = false)
    NotificationType type;
}

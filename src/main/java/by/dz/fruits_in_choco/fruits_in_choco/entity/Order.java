package by.dz.fruits_in_choco.fruits_in_choco.entity;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private double price;

    private Date date;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('NOT_CONFIRMED', 'CONFIRMED')", nullable = false)
    private OrderStatus status;

    @Column(columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isAgreeToSendingMessages;

    @OneToMany(fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;

    public Order() {
        this.orderItems = new ArrayList<>();
    }
}

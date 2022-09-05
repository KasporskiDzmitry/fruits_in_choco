package by.dz.fruits_in_choco.fruits_in_choco.entity.order;

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
    private short id;

    @Column(name = "user_id")
    private Short userId;

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private float price;

    private Date date;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "status", columnDefinition = "ENUM('NOT_CONFIRMED', 'CONFIRMED', 'DECLINED')", nullable = false)
    private OrderStatus status;

    @Column(columnDefinition = "BIT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isAgreeToSendingMessages;

    @OneToMany(fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;

    public Order() {
        this.status = OrderStatus.NOT_CONFIRMED;
        this.orderItems = new ArrayList<>();
    }
}

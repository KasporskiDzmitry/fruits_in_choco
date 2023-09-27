package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderResponse {
    private Long id;
    private Long userId;
    private float price;
    private Date date;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private List<OrderItemResponse> orderItems;
}

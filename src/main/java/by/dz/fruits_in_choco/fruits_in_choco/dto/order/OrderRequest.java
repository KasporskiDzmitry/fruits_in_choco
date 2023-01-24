package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import lombok.Data;

import java.util.Map;

@Data
public class OrderRequest {
    private short userId;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private float price;
    private Boolean isAgreeToSendingMessages;
    private Map<Short, Short> productIds;
}

package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private double price;

    private boolean isAgreeToSendingMessages;

    private List<Long> productIds;
}

package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class OrderRequest {

    private String firstname;

    private String lastname;

    private String email;

    private String phone;

    private Double price;

    private Boolean isAgreeToSendingMessages;

    private Map<Long, Integer> productIds;
}

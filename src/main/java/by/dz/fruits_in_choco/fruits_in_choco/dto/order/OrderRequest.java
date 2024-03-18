package by.dz.fruits_in_choco.fruits_in_choco.dto.order;

import java.util.Map;

public record OrderRequest(
        Long userId,
        String firstname,
        String lastname,
        String email,
        String phone,
        float price,
        Boolean isAgreeToSendingMessages,
        Map<Long, Integer> productIds
) {
}

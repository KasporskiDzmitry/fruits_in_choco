package by.dz.fruits_in_choco.fruits_in_choco.mapper;

import by.dz.fruits_in_choco.fruits_in_choco.dto.order.OrderRequest;
import by.dz.fruits_in_choco.fruits_in_choco.dto.order.OrderResponse;
import by.dz.fruits_in_choco.fruits_in_choco.entity.Order;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final ModelMapper modelMapper;
    private final OrderService orderService;

    private Order convertToEntity(OrderRequest orderRequest) {
        return modelMapper.map(orderRequest, Order.class);
    }

    private OrderResponse convertToResponseDto(Order order) {
        return modelMapper.map(order, OrderResponse.class);
    }

    public OrderResponse makeOrder(OrderRequest orderRequest) {
        return convertToResponseDto(orderService.makeOrder(convertToEntity(orderRequest), orderRequest.getProductIds()));
    }
}

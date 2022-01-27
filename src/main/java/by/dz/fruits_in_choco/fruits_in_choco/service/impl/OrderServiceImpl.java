package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Order;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Override
    public Order makeOrder(Order order, List<Long> productIds) {
        return null;
    }
}

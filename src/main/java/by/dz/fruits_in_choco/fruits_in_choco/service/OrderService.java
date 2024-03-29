package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order makeOrder(Order order, Map<Long, Integer> products);
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    void deleteOrderById(Long id);
    Order updateOrder(Order order, Long id);
}

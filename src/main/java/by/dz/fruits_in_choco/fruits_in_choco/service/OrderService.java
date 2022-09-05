package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order makeOrder(Order order, Map<Short, Short> products);
    List<Order> getAllOrders();
    Order getOrderById(Short id);
    void deleteOrderById(Short id);
    Order updateOrder(Order order, Short id);
}

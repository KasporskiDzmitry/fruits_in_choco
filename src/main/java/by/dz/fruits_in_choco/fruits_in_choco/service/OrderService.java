package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;

import java.util.List;
import java.util.Map;

public interface OrderService {
    Order makeOrder(Order order, Map<Short, Short> products);
    List<Order> getAllOrders();
    Order getOrderById(short id);
    void deleteOrderById(short id);
    Order updateOrder(Order order, short id);
}

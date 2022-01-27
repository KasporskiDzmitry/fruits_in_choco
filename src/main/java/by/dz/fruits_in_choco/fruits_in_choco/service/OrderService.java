package by.dz.fruits_in_choco.fruits_in_choco.service;

import by.dz.fruits_in_choco.fruits_in_choco.entity.Order;

import java.util.List;

public interface OrderService {

    Order makeOrder(Order order, List<Long> productIds);
}

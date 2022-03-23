package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.*;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderItemRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public Order makeOrder(Order order, Map<Long, Integer> productIds) {
        List<OrderItem> orderItemList = new ArrayList<>();

        for (Map.Entry<Long, Integer> entry: productIds.entrySet()) {
            Product product = productRepository.findById(entry.getKey()).get();
            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(entry.getValue());
            orderItemList.add(item);
            orderItemRepository.save(item);
        }
        order.setDate(new Date());
        order.getOrderItems().addAll(orderItemList);
        orderRepository.save(order);

        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }
}

package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.OrderItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderItemRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Order makeOrder(Order order, Map<Long, Integer> productIds) {
        List<OrderItem> orderItemList = new ArrayList<>();
        User user = userRepository.findById(order.getUserId()).get();

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

        user.getOrders().add(order);

        orderRepository.save(order);

        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    @Cacheable("orders")
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    @CacheEvict(value = "orders")
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order updateOrder(Order newOrder, Long id) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setOrderItems(newOrder.getOrderItems());
                    order.setFirstname(newOrder.getFirstname());
                    order.setEmail(newOrder.getEmail());
                    order.setStatus(newOrder.getStatus());
                    order.setDate(newOrder.getDate());
                    order.setAgreeToSendingMessages(newOrder.isAgreeToSendingMessages());
                    order.setPhone(newOrder.getPhone());
                    order.setLastname(newOrder.getLastname());
                    order.setPrice(newOrder.getPrice());
                    order.setUserId(newOrder.getUserId());
                    return orderRepository.save(order);
                })
                .orElseGet(() -> {
                    newOrder.setId(id);
                    return orderRepository.save(newOrder);
                });
    }
}

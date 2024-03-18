package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.Notification;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.OrderItem;
import by.dz.fruits_in_choco.fruits_in_choco.entity.product.Product;
import by.dz.fruits_in_choco.fruits_in_choco.entity.user.User;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderItemRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.OrderRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.ProductRepository;
import by.dz.fruits_in_choco.fruits_in_choco.repository.UserRepository;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

import static by.dz.fruits_in_choco.fruits_in_choco.util.Constants.NOTIFICATION_ORDER;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;

    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, OrderItemRepository orderItemRepository, UserRepository userRepository, SimpMessagingTemplate simpMessagingTemplate) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @Override
    public Order makeOrder(Order order, Map<Long, Integer> products) {
        List<OrderItem> orderItemList = new ArrayList<>();
        Long userId = order.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException(User.class.getSimpleName(), userId));

        for (Map.Entry<Long, Integer> entry : products.entrySet()) {
            Long productId = entry.getKey();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new EntityNotFoundException(Product.class.getSimpleName(), productId));

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

        user.getCart().clear();

        simpMessagingTemplate.convertAndSendToUser("admin", "/notification", new Notification(new Date(), NOTIFICATION_ORDER));
        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Order.class.getSimpleName(), id));
    }

    @Override
    public void deleteOrderById(Long id) {
        try {
            Order order = orderRepository.getById(id);
            User user = userRepository.getById(order.getUserId());
            user.getOrders().removeIf(o -> o.getId() == id);
            orderRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new EntityNotFoundException(Order.class.getSimpleName(), id);
        }
    }

    @Override
    public Order updateOrder(Order newOrder, Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(Order.class.getSimpleName(), id));
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
    }
}

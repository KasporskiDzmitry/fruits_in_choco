package by.dz.fruits_in_choco.fruits_in_choco.service.impl;

import by.dz.fruits_in_choco.fruits_in_choco.dto.Notification;
import by.dz.fruits_in_choco.fruits_in_choco.entity.category.Category;
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
    public Order makeOrder(Order order, Map<Short, Short> products) {
        List<OrderItem> orderItemList = new ArrayList<>();
        Short userId = order.getUserId();
        User user = userRepository.findById(userId).orElse(null);

        if (null == user) {
            throw new EntityNotFoundException(User.class.getSimpleName(), userId);
        }

        for (Map.Entry<Short, Short> entry: products.entrySet()) {
            Short productId = entry.getKey();
            Product product = productRepository.findById(productId).orElse(null);

            if (null == product) {
                throw new EntityNotFoundException(Product.class.getSimpleName(), productId);
            }

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(entry.getValue());
            orderItemList.add(item);
            orderItemRepository.save(item);
        }
        order.setDate(new Date());
        order.getOrderItems().addAll(orderItemList);

        user.getOrders().add(order);
        user.getCart().setCartItems(null);
        user.getCart().setQuantity((short) 0);
        user.getCart().setPrice((float) 0);

        orderRepository.save(order);

        Notification notification = Notification.builder()
                .date(new Date())
                .type(NOTIFICATION_ORDER)
                .build();

        simpMessagingTemplate.convertAndSendToUser("admin", "/notification", notification);

        return order;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Short id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (null == order) {
            throw new EntityNotFoundException(Order.class.getSimpleName(), id);
        }
        return order;
    }

    @Override
    public void deleteOrderById(Short id) {
        try {
            orderRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
             throw new EntityNotFoundException(Order.class.getSimpleName(), id);
        }
    }

    @Override
    public Order updateOrder(Order newOrder, Short id) {
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

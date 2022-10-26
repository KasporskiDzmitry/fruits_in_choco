package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.order.OrderRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.exception.EntityNotFoundException;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.OrderMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
public class OrderController {
    private final OrderMapper orderMapper;
    private final OrderService orderService;
    private final static Logger log = LogManager.getLogger(OrderController.class);

    OrderController(OrderMapper orderMapper, OrderService orderService) {
        this.orderMapper = orderMapper;
        this.orderService = orderService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Short id) {
        try {
            return ResponseEntity.ok(orderService.getOrderById(id));
        } catch (EntityNotFoundException e) {
            log.error("Failed to get order with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrderById(@PathVariable Short id) {
        try {
            orderService.deleteOrderById(id);
            return ResponseEntity.ok(200);
        } catch (EntityNotFoundException e) {
            log.error("Failed to delete order with id " + id, e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/orders")
    public ResponseEntity<?> makeOrder(@RequestBody OrderRequest orderRequest) {
        try {
            return ResponseEntity.ok(orderMapper.makeOrder(orderRequest));
        } catch (EntityNotFoundException e) {
            log.error("Failed to make order for user with email " + orderRequest.getEmail(), e);
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/orders/{id}")
    public ResponseEntity<?> updateOrder(@RequestBody Order order, @PathVariable Short id) {
        return ResponseEntity.ok(orderService.updateOrder(order, id));
    }
}

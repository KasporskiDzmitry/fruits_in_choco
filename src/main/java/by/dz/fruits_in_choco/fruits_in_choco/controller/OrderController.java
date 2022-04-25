package by.dz.fruits_in_choco.fruits_in_choco.controller;

import by.dz.fruits_in_choco.fruits_in_choco.dto.order.OrderRequest;
import by.dz.fruits_in_choco.fruits_in_choco.entity.order.Order;
import by.dz.fruits_in_choco.fruits_in_choco.mapper.OrderMapper;
import by.dz.fruits_in_choco.fruits_in_choco.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {
    private final OrderMapper orderMapper;
    private final OrderService orderService;

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
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.ok(200);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> makeOrder(@RequestBody OrderRequest orderRequest) {
        return ResponseEntity.ok(orderMapper.makeOrder(orderRequest));
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/orders/{id}")
    public ResponseEntity<?> updateOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.updateOrder(order));
    }
}

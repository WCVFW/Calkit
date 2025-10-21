package com.calzone.financial.orders;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderRepository repo;
  public OrderController(OrderRepository repo){this.repo=repo;}

  @GetMapping
  public ResponseEntity<List<OrderEntity>> list(@AuthenticationPrincipal Object user){
    return ResponseEntity.ok(repo.findAll());
  }

  @PostMapping
  public ResponseEntity<OrderEntity> create(@RequestBody OrderEntity o){
    return ResponseEntity.ok(repo.save(o));
  }
}

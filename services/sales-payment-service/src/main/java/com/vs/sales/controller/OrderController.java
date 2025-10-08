package com.vs.sales.controller;

import com.vs.sales.model.OrderEntity;
import com.vs.sales.repo.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderRepository repo;
  public OrderController(OrderRepository repo){this.repo=repo;}

  @GetMapping
  public List<OrderEntity> list(){return repo.findAll();}

  @PostMapping
  public OrderEntity create(@RequestBody OrderEntity o){return repo.save(o);}
}

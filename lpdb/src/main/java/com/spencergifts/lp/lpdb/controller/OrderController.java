package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.dto.OrderDto;
import com.spencergifts.lp.lpdb.model.Order;
import com.spencergifts.lp.lpdb.service.OrderService;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> findAll() {
        System.out.println(this.orderService.findAll().stream()
        .map(o -> OrderService.convertToDto(o))
        .collect(Collectors.toList()));
        return ResponseEntity.ok()
                .body(this.orderService.findAll().stream()
                        .map(o -> OrderService.convertToDto(o))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/store/{store_id}")
    public ResponseEntity<List<OrderDto>> findAllByStore(@PathVariable long store_id) {
        return ResponseEntity.ok()
                .body(this.orderService.findAllByStore(store_id).stream()
                        .map(o -> OrderService.convertToDto(o))
                        .collect(Collectors.toList()));
    }

    @GetMapping("/{order_id}")
    public ResponseEntity<OrderDto> findById(@PathVariable long order_id) {
        Optional<Order> optional = this.orderService.findById(order_id);

        if (optional.isPresent()) {
            return ResponseEntity.ok().body(OrderService.convertToDto(optional.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    
    @GetMapping("/search")
    ResponseEntity<List<OrderDto>> findByNumberAndYear(@RequestParam(value = "storeNumber") int storeNumber, @RequestParam(value = "year") Year year) {
        try {
            List<Order> orders = this.orderService.findByNumberAndYear(storeNumber, year);

            return ResponseEntity.ok()
                    .body(orders.stream().map(o -> OrderService.convertToDto(o)).collect(Collectors.toList()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }
    }


    @PostMapping 
    public ResponseEntity<OrderDto> create(@RequestBody Order order) {
        
        // System.out.println(order);

        try {
            Order o = this.orderService.create(order);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderService.convertToDto(o));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @PutMapping("/{order_id}")
    public ResponseEntity<OrderDto> update(@PathVariable long order_id, @RequestBody Order order) {
        try {
            this.orderService.update(order, order_id);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(OrderService.convertToDto(this.orderService.findById(order_id).get()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{order_id}")
    public ResponseEntity<OrderDto> delete(@PathVariable long order_id) {
        Optional<Order> orderOptional = this.orderService.findById(order_id);

        if (orderOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        
        this.orderService.delete(orderOptional.get());
        return ResponseEntity.ok().body(OrderService.convertToDto(orderOptional.get()));
    }

}

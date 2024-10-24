package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.dto.OrderItemDto;
import com.spencergifts.lp.lpdb.model.OrderItem;
import com.spencergifts.lp.lpdb.service.OrderItemService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/orderitems")
public class OrderItemController {

    private final OrderItemService orderItemService;

    OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping
    public ResponseEntity<List<OrderItemDto>> findAll() {
        return ResponseEntity.ok()
                .body(this.orderItemService.findAll().stream()
                        .map(oi -> OrderItemService.convertToDto(oi)).collect(Collectors.toList()));
    }

    @GetMapping("/{order_item_id}")
    public ResponseEntity<OrderItemDto> getMethodName(@PathVariable long order_item_id) {
        Optional<OrderItem> optional = this.orderItemService.findById(order_item_id);

        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok().body(OrderItemService.convertToDto(optional.get()));
    }

    @PostMapping
    public ResponseEntity<OrderItemDto> create(@RequestBody OrderItem orderItem) {
        try {

            OrderItem created = this.orderItemService.create(orderItem);
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderItemService.convertToDto(created));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{order_item_id}")
    public ResponseEntity<OrderItemDto> update(@PathVariable long order_item_id, @RequestBody OrderItem orderItem) {
        try {

            OrderItem updated = this.orderItemService.update(orderItem, order_item_id);
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderItemService.convertToDto(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{order_item_id}")
    public ResponseEntity<OrderItemDto> delete(@PathVariable long order_item_id) {
        Optional<OrderItem> optional = this.orderItemService.findById(order_item_id);

        if (optional.isPresent()) {
            this.orderItemService.delete(optional.get());
            return ResponseEntity.status(HttpStatus.OK).body(OrderItemService.convertToDto(optional.get()));

        }

        return ResponseEntity.badRequest().body(null);

    }

}

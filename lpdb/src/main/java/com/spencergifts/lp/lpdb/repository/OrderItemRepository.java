package com.spencergifts.lp.lpdb.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.spencergifts.lp.lpdb.model.OrderItem;

public interface OrderItemRepository extends ListCrudRepository<OrderItem, Long> {
    
}

package com.spencergifts.lp.lpdb.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.spencergifts.lp.lpdb.model.Order;

public interface OrderRepository extends ListCrudRepository<Order, Long> {
    
}

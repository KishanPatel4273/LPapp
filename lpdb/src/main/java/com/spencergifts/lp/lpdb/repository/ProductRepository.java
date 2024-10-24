package com.spencergifts.lp.lpdb.repository;

import org.springframework.data.repository.ListCrudRepository;

import com.spencergifts.lp.lpdb.model.Product;

public interface ProductRepository extends ListCrudRepository<Product, Long> {
    
}

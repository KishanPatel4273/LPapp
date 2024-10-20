package com.spencergifts.lp.lpdb.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.spencergifts.lp.lpdb.model.Product;
import com.spencergifts.lp.lpdb.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductService {

    public final ProductRepository productRepository;

    ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll() {
        return this.productRepository.findAll();
    }


    public List<Product> findAllActive() {
        return this.productRepository.findAll().stream().filter(p -> p.getActive()).collect(Collectors.toList());
    }

    public Optional<Product> findById(long id) {
        return this.productRepository.findById(id);
    }

    public Product create(Product product) {

        boolean valid = this.findAll().stream()
                .map(p -> p.getName().toLowerCase().equals(product.getName().toLowerCase()))
                .reduce(false, (a, b) -> a || b);

        if (valid) {
            return this.productRepository.save(product);
        }

        throw new ResourceNotFoundException("Product all ready exits!");
    }

    @Transactional
    public void update(Product product, long id) {
        Optional<Product> pOptional = this.findById(id);

        if (pOptional.isEmpty()) {
            throw new ResourceNotFoundException("Product not found");
        }

        Product p = pOptional.get();

        p.setActive(product.getActive());

        this.productRepository.save(p);
    }

    public void delete(Product product) {
        this.productRepository.delete(product);
    }

}

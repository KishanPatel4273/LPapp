package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.model.Product;
import com.spencergifts.lp.lpdb.service.ProductService;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAllActive() {
        return ResponseEntity.ok().body(this.productService.findAllActive());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok().body(this.productService.findAll());
    }

    @GetMapping("/{product_id}")
    public ResponseEntity<Product> getMethodName(@RequestParam long product_id) {

        Optional<Product> pOptional = this.productService.findById(product_id);

        if(pOptional.isPresent()) {
            return ResponseEntity.ok().body(pOptional.get());
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    @PostMapping
    public ResponseEntity<Product> postMethodName(@RequestBody Product product) {
        try {
            Product p = this.productService.create(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(p);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);            
        }
    }
    
    @PutMapping("/{product_id}")
    public ResponseEntity<Product> update(@PathVariable long product_id, @RequestBody Product product) {
        try {
            this.productService.update(product, product_id);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(this.productService.findById(product_id).get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{product_id}")
    public ResponseEntity<Product> delete(@PathVariable long product_id) {
        Optional<Product> pOptional = this.productService.findById(product_id);

        if(pOptional.isPresent()) {
            return ResponseEntity.ok().body(pOptional.get());
        }

        this.productService.delete(pOptional.get());
        return ResponseEntity.ok().body(pOptional.get());
    }

}

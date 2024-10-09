package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.service.StoreService;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/stores")
public class StoreController {
    
    private final StoreService storeService;

    StoreController(StoreService storeService){
        this.storeService = storeService;
    }

    @GetMapping
    public List<Store> findAll() {
        return this.storeService.findAll();
    }

    @GetMapping("/{store_id}")
    ResponseEntity<Store> findById(@PathVariable long store_id) {
        Optional<Store> store = storeService.findById(store_id);

        if (store.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(store.get());
    }
    
    @PostMapping
    ResponseEntity<List<Store>> createAll(@RequestBody List<Store> stores) {
        try {
            System.err.println(stores);
            this.storeService.create(stores);
            return ResponseEntity.ok().body(null);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // @PutMapping("/{store_id}")
    // ResponseEntity<Store>  putMethodName(@RequestBody Store store, @PathVariable long id) {
    //     Optional<Store> _store = storeService.findById(id);
        
    //     if (_store.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }

    //     // TODO: make sure store is valid
    //     this.storeService.update(store, id);
    //     return ResponseEntity.ok().body(null);
    // }

    @DeleteMapping
    ResponseEntity<Store> delete(@PathVariable long id) {
        Optional<Store> store = storeService.findById(id);

        if (store.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        this.storeService.delete(store.get());
        return ResponseEntity.status(HttpStatus.OK).body(null);    
    }
}

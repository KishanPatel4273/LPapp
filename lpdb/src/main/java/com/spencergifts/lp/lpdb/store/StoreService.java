package com.spencergifts.lp.lpdb.store;

import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import jakarta.transaction.Transactional;

@Service
public class StoreService {

    public final StoreRepository storeRepository;

    StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    List<Store> findAll() {
        return this.storeRepository.findAll();
    }

    Optional<Store> findById(long id) {
        return this.storeRepository.findById(id);
    }

    Optional<Store> findByStoreNumber(int store_number, Year year) {
        Store store = this.storeRepository.findByStoreNumber(store_number, year);
        if(store == null) {
            return Optional.empty();
        }
        return Optional.of(store);
    }

    void create(Store store) {
        // TODO: check if its valid
        this.storeRepository.save(store);
    }

    void create(List<Store> stores) {
        // TODO: check if its valid
        this.storeRepository.saveAll(stores);
    }

    @Transactional
    void update(Store store, long store_id){
        int updated = this.storeRepository.update(store.getStoreType(), 
                                    store.getStoreNumber(), 
                                    store.getAddress(), 
                                    store.getCity(), 
                                    store.getState(), 
                                    store.getZip(), 
                                    store.getYear(), 
                                    store.getPrevious_store_id(), 
                                    store_id);
                        
        Assert.state(updated == 1, "Failed to create store " + store.getStoreNumber());
    }

    void delete(Store store){
        // Do you delete all the stores history through previous_store_number 
        this.storeRepository.delete(store);
    }
}

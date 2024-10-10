package com.spencergifts.lp.lpdb.service;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.spencergifts.lp.lpdb.dto.AlarmCodeDto;
import com.spencergifts.lp.lpdb.dto.StoreDto;
import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.repository.StoreRepository;

import jakarta.transaction.Transactional;

@Service
public class StoreService {

    public final StoreRepository storeRepository;
    public final AlarmCodeService alarmCodeService;

    StoreService(StoreRepository storeRepository, AlarmCodeService alarmCodeService) {
        this.storeRepository = storeRepository;
        this.alarmCodeService = alarmCodeService;
    }

    public List<StoreDto> findAll() {
        return this.storeRepository.findAll().stream()
                .map(s -> convertToDto(s))
                .collect(Collectors.toList());
    }

    public Optional<Store> findById(long id) {
        return this.storeRepository.findById(id);
    }

    public Store findByNumberAndYear(int storeNumber, Year year) {
        List<Store> sList = this.storeRepository.findByStoreNumberAndYear(storeNumber, year);

        if (sList.size() == 1) {
            return sList.get(0);
        }

        throw new ResourceNotFoundException("Store not found!");
    }

    void create(Store store) {
        // TODO: check if its valid
        this.storeRepository.save(store);
    }

    public void create(List<Store> stores) {
        // TODO: check if its valid
        this.storeRepository.saveAll(stores);
    }

    // @Transactional
    // public
    // void update(Store store, long store_id){
    // int updated = this.storeRepository.update(store.getStoreType(),
    // store.getStoreId(),
    // store.getAddress(),
    // store.getCity(),
    // store.getState(),
    // store.getZip(),
    // store.getYear(),
    // store.getPreviousStoreId(),
    // store_id);

    // Assert.state(updated == 1, "Failed to create store " + store.getStoreId());
    // }

    public void delete(Store store) {
        //@TODO you delete all the stores history through previous_store_number
        this.storeRepository.delete(store);
    }

    public StoreDto convertToDto(Store store) {
        StoreDto sDto = new StoreDto(store.getStoreId(), store.getStoreType(),
                        store.getStoreNumber(), store.getAddress(), 
                        store.getCity(), store.getState(), store.getZip(), 
                        store.getYear(), store.getPreviousStoreId(), 
                        store.getAlarmCodes().stream().map(ac -> this.alarmCodeService.convertToDto(ac)).collect(Collectors.toSet()));
        return sDto;
    }

}

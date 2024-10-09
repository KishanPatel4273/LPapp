package com.spencergifts.lp.lpdb.service;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.spencergifts.lp.lpdb.dto.AlarmCodeDto;
import com.spencergifts.lp.lpdb.model.AlarmCode;
import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.repository.AlarmCodeRepository;

import jakarta.transaction.Transactional;

@Service
public class AlarmCodeService {
    public final AlarmCodeRepository alarmCodeRepository;
    public final StoreService storeService;

    AlarmCodeService(AlarmCodeRepository alarmCodeRepository, StoreService storeService) {
        this.alarmCodeRepository = alarmCodeRepository;
        this.storeService = storeService;
    }

    public List<AlarmCodeDto> findAll() {
        List<AlarmCode> acl =  this.alarmCodeRepository.findAll();

        return acl.stream()
                .map(ac -> new AlarmCodeDto(ac.getAlarmCodeId(), ac.getFirstName(), ac.getLastName(), 
                                            ac.getCode(), ac.getPhoneNumber(), ac.getActive(),
                                            ac.getDateCreated(), ac.getStore().getStoreId()))
                .collect(Collectors.toList());
    }

    public Optional<AlarmCode> findById(long id) {
        return this.alarmCodeRepository.findById(id);
    }

    public List<AlarmCode> findByStoreNumber(int store_number, Year year) {
        List<AlarmCode> alarmCodes = this.alarmCodeRepository.findByStoreNumber(store_number, year);
       
        return alarmCodes;
    }

    public AlarmCode create(AlarmCode alarmCode) {
        // TODO: check if its valid

        Optional<Store> store = this.storeService.findById(alarmCode.getStore().getStoreId());
        
        if (store.isPresent()) {
            alarmCode.setStore(store.get());
            return this.alarmCodeRepository.save(alarmCode);
        }
        
        throw new ResourceNotFoundException("Store not found!");
    }

    void create(List<AlarmCode> alarmCodes) {
        // TODO: check if its valid
        this.alarmCodeRepository.saveAll(alarmCodes);
    }

    @Transactional
    public
    void update(AlarmCode store, long store_id){
    
    }

    public void delete(AlarmCode alarmCode){
        this.alarmCodeRepository.delete(alarmCode);
    }
}

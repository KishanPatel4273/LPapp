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
import com.spencergifts.lp.lpdb.repository.StoreRepository;

import jakarta.transaction.Transactional;

@Service
public class AlarmCodeService {
    public final AlarmCodeRepository alarmCodeRepository;
    public final StoreRepository storeRepository;

    AlarmCodeService(AlarmCodeRepository alarmCodeRepository, StoreRepository storeRepository) {
        this.alarmCodeRepository = alarmCodeRepository;
        this.storeRepository = storeRepository;
    }

    public List<AlarmCodeDto> findAll() {
        List<AlarmCode> acl = this.alarmCodeRepository.findAll();

        return acl.stream()
                .map(ac -> convertToDto(ac))
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

        Optional<Store> optionalStore = this.storeRepository.findById(alarmCode.getStore().getStoreId());

        if (optionalStore.isPresent()) {
  
            return this.alarmCodeRepository.save(alarmCode);
        }

        throw new ResourceNotFoundException("Store not found!");
    }

    void create(List<AlarmCode> alarmCodes) {
        // TODO: check if its valid
        this.alarmCodeRepository.saveAll(alarmCodes);
    }

    @Transactional
    public void update(AlarmCode alarmCode, long id) {
        Optional<AlarmCode> optionalAC = this.findById(id);

        if (optionalAC.isEmpty()) {
            throw new ResourceNotFoundException("Alarm Code not found");
        }

        AlarmCode ac = optionalAC.get();
        // can only update the following fields
        ac.setFirstName(alarmCode.getFirstName());
        ac.setLastName(alarmCode.getLastName());
        ac.setCode(alarmCode.getCode());
        ac.setPhoneNumber(alarmCode.getPhoneNumber());
        ac.setActive(alarmCode.getActive());
        
        this.alarmCodeRepository.save(ac);
    }

    public void delete(AlarmCode alarmCode) {
        /**
         * @NOTE keep in mind that store has cascade all and orphan which allows it to
         * un link by itself and alarm code being a child should not have cascade
         */
        this.alarmCodeRepository.delete(alarmCode);
    }

    public AlarmCodeDto convertToDto(AlarmCode alarmCode) {
        AlarmCodeDto acd = new AlarmCodeDto(alarmCode.getAlarmCodeId(), alarmCode.getFirstName(),
                alarmCode.getLastName(), alarmCode.getCode(),
                alarmCode.getPhoneNumber(), alarmCode.isActive(), alarmCode.getDateCreated(),
                alarmCode.getStore().getStoreId());

        return acd;
    }
}

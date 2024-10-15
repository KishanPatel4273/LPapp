package com.spencergifts.lp.lpdb.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.spencergifts.lp.lpdb.dto.AlarmPanelDto;
import com.spencergifts.lp.lpdb.model.AlarmPanel;
import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.repository.AlarmPanelRepository;
import com.spencergifts.lp.lpdb.repository.StoreRepository;

import jakarta.transaction.Transactional;

@Service
public class AlarmPanelService {
    
    public final AlarmPanelRepository alarmPanelRepository;
    public final StoreRepository storeRepository;

    AlarmPanelService(AlarmPanelRepository alarmPanelRepository, StoreRepository storeRepository) {
        this.alarmPanelRepository = alarmPanelRepository;
        this.storeRepository = storeRepository;
    }

    public List<AlarmPanel> findAll() {
        return this.alarmPanelRepository.findAll();
    }

    public Optional<AlarmPanel> findById(long id) {
        return this.alarmPanelRepository.findById(id);
    }

    public AlarmPanel create(AlarmPanel alarmPanel) {
        System.out.println(alarmPanel);
        List<Optional<Store>> los = alarmPanel.getStores().stream().map(s -> this.storeRepository.findById(s.getStoreId())).collect(Collectors.toList());

        if (los.stream().allMatch(os -> os.isPresent())) {
            
            alarmPanel.setStores(los.stream().map(os -> os.get()).collect(Collectors.toSet()));
            return this.alarmPanelRepository.save(alarmPanel);
        }

        throw new ResourceNotFoundException("Stores not found!");
    }

    @Transactional
    public void update(AlarmPanel alarmPanel, long id) {

        Optional<AlarmPanel> aOptional = this.findById(id);

        if(aOptional.isEmpty()) {
            throw new ResourceNotFoundException("AlarmPanel not found!");
        }

        AlarmPanel ap = aOptional.get();
        
        ap.setPanelNumber(alarmPanel.getPanelNumber());
        ap.setAlarmPanelType(alarmPanel.getAlarmPanelType());
        ap.setTXID(alarmPanel.getTXID());
        ap.setSmartTechNumber(alarmPanel.getSmartTechNumber());
        ap.setIMEI(alarmPanel.getIMEI());
        ap.setICCID(alarmPanel.getICCID());    

        this.alarmPanelRepository.save(ap);
    }

    @Transactional
    public void connectNewStore(long alarmPanelId, long storeId) {
        Optional<AlarmPanel> aOptional = this.findById(alarmPanelId);
        Optional<Store> sOptional = this.storeRepository.findById(storeId);
        
        if (aOptional.isEmpty()) {
            throw new ResourceNotFoundException("Alarm panel not found!");
        }
        if (sOptional.isEmpty()) {
            throw new ResourceNotFoundException("Store not found!");
        }

        AlarmPanel ap = aOptional.get();
        Store store = sOptional.get();

        ap.getStores().add(store);

        this.alarmPanelRepository.save(ap);
    }

    @Transactional
    public void disconnectStore(long alarmPanelId, long storeId) {
        Optional<AlarmPanel> aOptional = this.findById(alarmPanelId);
        Optional<Store> sOptional = this.storeRepository.findById(storeId);
        
  
        if (aOptional.isEmpty()) {
            throw new ResourceNotFoundException("Alarm panel not found!");
        }
        if (sOptional.isEmpty()) {
            throw new ResourceNotFoundException("Store not found!");
        }
        
        AlarmPanel ap = aOptional.get();
        Store store = sOptional.get();

        ap.getStores().remove(store);

        this.alarmPanelRepository.save(ap);    
    }


    public void delete(AlarmPanel alarmPanel) {
        
        for (Store store : alarmPanel.getStores()) {
            alarmPanel.getStores().remove(store);
        }

        this.alarmPanelRepository.delete(alarmPanel);
    }    

    public AlarmPanelDto convertToDto(AlarmPanel alarmPanel) {
        AlarmPanelDto alarmPanelDto = new AlarmPanelDto();
        alarmPanelDto.setAlarmPanelId(alarmPanel.getAlarmPanelId());
        alarmPanelDto.setPanelNumber(alarmPanel.getPanelNumber());
        alarmPanelDto.setAlarmPanelType(alarmPanel.getAlarmPanelType());
        alarmPanelDto.setTXID(alarmPanel.getTXID());
        alarmPanelDto.setSmartTechNumber(alarmPanel.getSmartTechNumber());
        alarmPanelDto.setIMEI(alarmPanel.getIMEI());
        alarmPanelDto.setICCID(alarmPanel.getICCID());
        alarmPanelDto.setStores(alarmPanel.getStores().stream().map(s -> s.getStoreId()).collect(Collectors.toSet()));
        return alarmPanelDto;
    }

}

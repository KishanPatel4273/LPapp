package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.dto.AlarmPanelDto;
import com.spencergifts.lp.lpdb.model.AlarmCode;
import com.spencergifts.lp.lpdb.model.AlarmPanel;
import com.spencergifts.lp.lpdb.service.AlarmPanelService;

import java.time.Year;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/alarmpanels")
public class AlarmPanelController {

    private final AlarmPanelService alarmPanelService;

    AlarmPanelController(AlarmPanelService alarmPanelService) {
        this.alarmPanelService = alarmPanelService;
    }

    @GetMapping
    public ResponseEntity<List<AlarmPanelDto>> findALL() {
        return ResponseEntity.ok().body(this.alarmPanelService.findAll().stream()
                .map(ap -> this.alarmPanelService.convertToDto(ap)).collect(Collectors.toList()));
    }

    @GetMapping("/{alarm_panel_id}")
    public ResponseEntity<AlarmPanelDto> getById(@PathVariable long alarm_panel_id) {
        Optional<AlarmPanel> pOptional = this.alarmPanelService.findById(alarm_panel_id);

        if (pOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.ok().body(this.alarmPanelService.convertToDto(pOptional.get()));
    }

    @PostMapping
    public ResponseEntity<AlarmPanelDto> create(@RequestBody AlarmPanel alarmPanel) {
        try {
            AlarmPanel ap = this.alarmPanelService.create(alarmPanel);
            return ResponseEntity.status(HttpStatus.CREATED).body(this.alarmPanelService.convertToDto(ap));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{alarm_panel_id}")
    public ResponseEntity<AlarmPanelDto> update(@PathVariable long alarm_panel_id, @RequestBody AlarmPanel alarmPanel) {
        try {
            this.alarmPanelService.update(alarmPanel, alarm_panel_id);

            return ResponseEntity.ok()
                    .body(this.alarmPanelService.convertToDto(this.alarmPanelService.findById(alarm_panel_id).get()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/connect")
    public ResponseEntity<AlarmPanelDto> putConnectStore(
            @RequestParam(value = "storeId", required = false) long storeId,
            @RequestParam(value = "alarmPanelId", required = false) long alarmPanelId) {

        try {
            this.alarmPanelService.connectNewStore(alarmPanelId, storeId);

            return ResponseEntity.ok()
                    .body(this.alarmPanelService.convertToDto(this.alarmPanelService.findById(alarmPanelId).get()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }

    }

    @PutMapping("/disconnect")
    public ResponseEntity<AlarmPanelDto> putMethodName(
            @RequestParam(value = "storeId") long storeId,
            @RequestParam(value = "alarmPanelId") long alarmPanelId) {

        try {

            this.alarmPanelService.disconnectStore(alarmPanelId, storeId);

            return ResponseEntity.ok()
                    .body(this.alarmPanelService.convertToDto(this.alarmPanelService.findById(alarmPanelId).get()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        
    }

    @DeleteMapping("/{alarm_panel_id}")
    public ResponseEntity<AlarmPanelDto> delete(@PathVariable long alarm_panel_id) {
        Optional<AlarmPanel> aOptional = this.alarmPanelService.findById(alarm_panel_id);

        if (aOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        this.alarmPanelService.delete(aOptional.get());
        return ResponseEntity.ok().body(this.alarmPanelService.convertToDto(aOptional.get()));
    }

}

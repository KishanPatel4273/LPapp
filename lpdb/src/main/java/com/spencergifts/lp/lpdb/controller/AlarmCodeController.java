package com.spencergifts.lp.lpdb.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spencergifts.lp.lpdb.dto.AlarmCodeDto;
import com.spencergifts.lp.lpdb.model.AlarmCode;
import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.service.AlarmCodeService;
import com.spencergifts.lp.lpdb.service.StoreService;

import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/alarms")
public class AlarmCodeController {

    private final AlarmCodeService alarmCodeService;

    AlarmCodeController(AlarmCodeService alarmCodeService) {
        this.alarmCodeService = alarmCodeService;
    }

    @GetMapping
    public ResponseEntity<List<AlarmCodeDto>> findAll() {
        return  ResponseEntity.ok().body(this.alarmCodeService.findAll());
    }

    @GetMapping("/{alarm_code_id}")
    ResponseEntity<AlarmCode> findById(@PathVariable long alarm_code_id) {
        Optional<AlarmCode> alarmCode = this.alarmCodeService.findById(alarm_code_id);

        if (alarmCode.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(alarmCode.get());
    }

    @GetMapping("/search")
    public ResponseEntity<List<AlarmCode>> searchAlarmCodes(
            @RequestParam(value = "store_number", required = false) int storeNumber,
            @RequestParam(value = "year", required = false) Year year) {

        List<AlarmCode> alarmCodes = this.alarmCodeService.findByStoreNumber(storeNumber, year);

        if (alarmCodes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(alarmCodes);
    }

    @PostMapping
    ResponseEntity<AlarmCode> create(@RequestBody AlarmCode alarmCode) {

        // find the store associated with this alarm_code
        System.err.println(alarmCode.toString());
        try {
            AlarmCode alarmCode_ = this.alarmCodeService.create(alarmCode);
            System.out.println(alarmCode_);
            return ResponseEntity.status(HttpStatus.CREATED).body(alarmCode_);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // @PutMapping("/{alarm_code_id}")
    // ResponseEntity<AlarmCode> putMethodName(@RequestBody AlarmCode alarmCode, @PathVariable long id) {
    //     Optional<AlarmCode> _alarm = this.alarmCodeService.findById(id);

    //     if (_alarm.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }

    //     // TODO: make sure store is valid
    //     this.alarmCodeService.update(alarmCode, id);
    //     return ResponseEntity.ok().body(null);
    // }

    // @DeleteMapping
    // ResponseEntity<AlarmCode> delete(@PathVariable long id) {
    //     Optional<AlarmCode> alarmCode = this.alarmCodeService.findById(id);

    //     if (alarmCode.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    //     }
    //     this.alarmCodeService.delete(alarmCode.get());
    //     return ResponseEntity.status(HttpStatus.OK).body(null);
    // }
}

package com.spencergifts.lp.lpdb.repository;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import com.spencergifts.lp.lpdb.model.AlarmCode;
import com.spencergifts.lp.lpdb.model.StoreType;

import jakarta.transaction.Transactional;

public interface AlarmCodeRepository extends ListCrudRepository<AlarmCode, Long> {
    
    
    @Query(value = "SELECT ac.* FROM alarm_codes ac " +
                    "JOIN stores s ON ac.store_id = s.store_id " +
                    "WHERE s.store_number = :store_number AND YEAR(ac.date_created) = :year", 
    nativeQuery = true)    
    List<AlarmCode> findByStoreNumber(
        @Param("store_number") int store_number, 
        @Param("year") Year year
    );

    // @Modifying
    // @Transactional
    // @Query("UPDATE AlarmCode a SET a.first_name = :first_name, s.last_name = :last_name, s.code = :code, s.phone_number = :phone_number WHERE s.alarm_code_id = :alarm_code_id")
    // int update(
    //     @Param("alarm_code_id") long alarm_code_id,
    //     @Param("first_name") StoreType first_name,
    //     @Param("last_name") long last_name,
    //     @Param("code") String code,
    //     @Param("phone_number") String phone_number
    // );

}


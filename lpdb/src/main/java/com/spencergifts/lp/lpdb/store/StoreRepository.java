package com.spencergifts.lp.lpdb.store;

import java.time.Year;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

public interface StoreRepository extends ListCrudRepository<Store, Long> {

    @Query(value="SELECT * FROM stores WHERE store_number = :store_number AND year = :year" , nativeQuery = true)
    Store findByStoreNumber(@Param("store_number") int store_number, @Param("year") Year year);
    

    @Modifying
    @Transactional
    @Query("UPDATE Store s SET s.store_type = :store_type, s.store_number = :store_number, s.address = :address, s.city = :city, s.state = :state, s.zip = :zip, s.year = :year, s.previous_store_id = :previous_store_id WHERE s.store_id = :store_id")
    int update(
        @Param("store_type") StoreType store_type,
        @Param("store_number") long l,
        @Param("address") String address,
        @Param("city") String city,
        @Param("state") String state,
        @Param("zip") String zip,
        @Param("year") Year year,
        @Param("previous_store_id") long previous_store_id,
        @Param("store_id") long store_id
    );}

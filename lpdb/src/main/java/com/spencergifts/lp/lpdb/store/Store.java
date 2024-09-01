package com.spencergifts.lp.lpdb.store;

import java.time.Year;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id", unique = true, nullable = false)
    private long store_id;

    @Column(name = "store_type", nullable = false)
    private StoreType store_type;

    @Column(name = "store_number", nullable = false)
    private int store_number;

    @Column(name = "address", nullable = false, length = 128)
    private String address;

    @Column(name = "city", nullable = false, length = 128)
    private String city;

    @Column(name = "state", nullable = false, length = 128)
    private String state;

    @Column(name = "zip", nullable = false, length = 128)
    private String zip;
    
    @Column(name = "year", nullable = false)
    private Year year;

    @Column(name = "previous_store_id", nullable = true)
    private long previous_store_id;

    public Store() {

    }

    public Store(long store_id, StoreType store_type, int store_number, String address, String city, String state, String zip, Year year, long previous_store_id) {
        this.store_id = store_id;
        this.store_type = store_type;
        this.store_number = store_number;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.year = year;
        this.previous_store_id = previous_store_id;
    }

    public long getStoreId() {
        return this.store_id;
    }

    public void setStoreId(long store_id) {
        this.store_id = store_id;
    }

    public long getStore_id() {
        return this.store_id;
    }

    public void setStore_id(long store_id) {
        this.store_id = store_id;
    }

    public StoreType getStore_type() {
        return this.store_type;
    }

    public void setStore_type(StoreType store_type) {
        this.store_type = store_type;
    }

    public int adgetStore_number() {
        return this.store_number;
    }

    public void setStore_number(int store_number) {
        this.store_number = store_number;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getPrevious_store_id() {
        return this.previous_store_id;
    }

    public void setPrevious_store_id(long previous_store_id) {
        this.previous_store_id = previous_store_id;
    }

    public StoreType getStoreType() {
        return this.store_type;
    }

    public void setStoreType(StoreType store_type) {
        this.store_type = store_type;
    }

    public int getStoreNumber() {
        return this.store_number;
    }

    public void setStoreNumber(int store_number) {
        this.store_number = store_number;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return this.zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public Year getYear() {
        return this.year;
    }

    public void setYear(Year year) {
        this.year = year;
    }

    public long getPreviousStoreId() {
        return this.previous_store_id;
    }

    public void setPreviousStoreId(long previous_store_id) {
        this.previous_store_id = previous_store_id;
    }
}

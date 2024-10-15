package com.spencergifts.lp.lpdb.dto;

import java.time.Year;
import java.util.HashSet;
import java.util.Set;

import com.spencergifts.lp.lpdb.enums.StoreType;
public class StoreDto {

    private long storeId;
    private StoreType storeType;
    private int storeNumber;
    private String address;
    private String city;
    private String state;
    private String zip;
    private Year year;
    private long previousStoreId;

    private Set<AlarmCodeDto> alarmCodes = new HashSet<>();
    private Set<AlarmPanelDto> alarmPanels = new HashSet<>();

    public StoreDto(long storeId, StoreType storeType, int storeNumber, String address, String city, String state,
            String zip, Year year, long previousStoreId, Set<AlarmCodeDto> alarmCodes, Set<AlarmPanelDto> alarmPanels) {
        this.storeId = storeId;
        this.storeType = storeType;
        this.storeNumber = storeNumber;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.year = year;
        this.previousStoreId = previousStoreId;
        this.alarmCodes = alarmCodes;
        this.alarmPanels = alarmPanels;
    }

    public long getStoreId() {
        return this.storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public StoreType getStoreType() {
        return this.storeType;
    }

    public void setStoreType(StoreType storeType) {
        this.storeType = storeType;
    }

    public int getStoreNumber() {
        return this.storeNumber;
    }

    public void setStoreNumber(int storeNumber) {
        this.storeNumber = storeNumber;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
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
        return this.previousStoreId;
    }

    public void setPreviousStoreId(long previousStoreId) {
        this.previousStoreId = previousStoreId;
    }

    public Set<AlarmCodeDto> getAlarmCodes() {
        return this.alarmCodes;
    }

    public void setAlarmCodes(Set<AlarmCodeDto> alarmCodes) {
        this.alarmCodes = alarmCodes;
    }

    public Set<AlarmPanelDto> getAlarmPanels() {
        return this.alarmPanels;
    }

    public void setAlarmPanels(Set<AlarmPanelDto> alarmPanels) {
        this.alarmPanels = alarmPanels;
    }

    @Override
    public String toString() {
        return "{" +
                " storeId='" + getStoreId() + "'" +
                ", storeType='" + getStoreType() + "'" +
                ", storeNumber='" + getStoreNumber() + "'" +
                ", address='" + getAddress() + "'" +
                ", city='" + getCity() + "'" +
                ", state='" + getState() + "'" +
                ", zip='" + getZip() + "'" +
                ", year='" + getYear() + "'" +
                ", previousStoreId='" + getPreviousStoreId() + "'" +
                ", alarmCodes='" + getAlarmCodes() + "'" +
                ", alarmPanels='" + getAlarmPanels() + "'" +
                "}";
    }
}

package com.spencergifts.lp.lpdb.model;

import java.time.Year;
import java.util.HashSet;
import java.util.Set;

import com.spencergifts.lp.lpdb.enums.StoreType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "stores")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_id", unique = true, nullable = false)
    private long storeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "store_type", nullable = false)
    private StoreType storeType;

    @Column(name = "store_number", nullable = false)
    private int storeNumber;

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
    private long previousStoreId;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<AlarmCode> alarmCodes = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(name = "store_alarm_panel", // Join table name
            joinColumns = @JoinColumn(name = "store_id"), inverseJoinColumns = @JoinColumn(name = "alarm_panel_id"))
    private Set<AlarmPanel> alarmPanels = new HashSet<>();

    public Store() {
    }

    public Store(long storeId, StoreType storeType, int storeNumber, String address, String city, String state,
            String zip, Year year, long previousStoreId) {
        this.storeId = storeId;
        this.storeType = storeType;
        this.storeNumber = storeNumber;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.year = year;
        this.previousStoreId = previousStoreId;
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

    public Set<AlarmCode> getAlarmCodes() {
        return this.alarmCodes;
    }

    public void setAlarmCodes(Set<AlarmCode> alarmCodes) {
        this.alarmCodes = alarmCodes;
    }

    public Set<AlarmPanel> getAlarmPanels() {
        return this.alarmPanels;
    }

    public void setAlarmPanels(Set<AlarmPanel> alarmPanels) {
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
                "}";
    }

}

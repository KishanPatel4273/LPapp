package com.spencergifts.lp.lpdb.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "alarm_codes")
public class AlarmCode {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_code_id", unique = true, nullable = false)
    private long alarmCodeId;

    @Column(name = "first_name", nullable = false, length = 128)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 128)
    private String lastName;
    
    @Column(name = "code", nullable = false, length = 4)
    private String code;

    @Column(name = "phone_number", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "date_created")
    @CreationTimestamp
    private LocalDateTime dateCreated;

    // Adding ManyToOne relationship for store_id (foreign key to Store)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)  // Many alarm codes can belong to one store
    @JoinColumn(name = "store_id", nullable = false)      // This defines the foreign key column in the alarm_codes table
    private Store store;   // Store entity reference

    // Constructor
    public AlarmCode() {}


    public AlarmCode(long alarmCodeId, String firstName, String lastName, String code, String phoneNumber, boolean active, LocalDateTime dateCreated, Store store) {
        this.alarmCodeId = alarmCodeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.code = code;
        this.phoneNumber = phoneNumber;
        this.active = active;
        this.dateCreated = dateCreated;
        this.store = store;
    }

    public long getAlarmCodeId() {
        return this.alarmCodeId;
    }

    public void setAlarmCodeId(long alarmCodeId) {
        this.alarmCodeId = alarmCodeId;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isActive() {
        return this.active;
    }

    public boolean getActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public LocalDateTime getDateCreated() {
        return this.dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Store getStore() {
        return this.store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    @Override
    public String toString() {
        return "{" +
            " alarmCodeId='" + getAlarmCodeId() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", code='" + getCode() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", active='" + isActive() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", store='" + getStore() + "'" +
            "}";
    }
    
}

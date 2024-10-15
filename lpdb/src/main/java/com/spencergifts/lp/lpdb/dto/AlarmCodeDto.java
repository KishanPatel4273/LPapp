package com.spencergifts.lp.lpdb.dto;

import java.time.LocalDateTime;


public class AlarmCodeDto {
    
    private long alarmCodeId;

    private String firstName;

    private String lastName;
    
    private String code;

    private String phoneNumber;

    private boolean active;

    private LocalDateTime dateCreated;

    private long storeID;   // Store entity reference

    public AlarmCodeDto() {}

    public AlarmCodeDto(long alarmCodeId, String firstName, String lastName, String code, String phoneNumber, boolean active, LocalDateTime dateCreated, long storeID) {
        this.alarmCodeId = alarmCodeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.code = code;
        this.phoneNumber = phoneNumber;
        this.active = active;
        this.dateCreated = dateCreated;
        this.storeID = storeID;
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

    public long getStoreID() {
        return this.storeID;
    }

    public void setStoreID(long storeID) {
        this.storeID = storeID;
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
            ", storeID='" + getStoreID() + "'" +
            "}";
    }
    
}
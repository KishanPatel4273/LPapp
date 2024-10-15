package com.spencergifts.lp.lpdb.dto;

import java.util.HashSet;
import java.util.Set;

import com.spencergifts.lp.lpdb.enums.AlarmPanelType;

public class AlarmPanelDto {

    private long alarmPanelId;
    private String panelNumber;
    private AlarmPanelType alarmPanelType;
    private String TXID; // format ....-....
    private String smartTechNumber;
    private String IMEI; // 15-digit number
    private String ICCID; // 20-digit number
    private Set<Long> stores = new HashSet<>();

    public AlarmPanelDto() {}

    public AlarmPanelDto(long alarmPanelId, String panelNumber, AlarmPanelType alarmPanelType, String TXID, String smartTechNumber, String IMEI, String ICCID, Set<Long> stores) {
        this.alarmPanelId = alarmPanelId;
        this.panelNumber = panelNumber;
        this.alarmPanelType = alarmPanelType;
        this.TXID = TXID;
        this.smartTechNumber = smartTechNumber;
        this.IMEI = IMEI;
        this.ICCID = ICCID;
        this.stores = stores;
    }


    public long getAlarmPanelId() {
        return this.alarmPanelId;
    }

    public void setAlarmPanelId(long alarmPanelId) {
        this.alarmPanelId = alarmPanelId;
    }

    public String getPanelNumber() {
        return this.panelNumber;
    }

    public void setPanelNumber(String panelNumber) {
        this.panelNumber = panelNumber;
    }

    public AlarmPanelType getAlarmPanelType() {
        return this.alarmPanelType;
    }

    public void setAlarmPanelType(AlarmPanelType alarmPanelType) {
        this.alarmPanelType = alarmPanelType;
    }

    public String getTXID() {
        return this.TXID;
    }

    public void setTXID(String TXID) {
        this.TXID = TXID;
    }

    public String getSmartTechNumber() {
        return this.smartTechNumber;
    }

    public void setSmartTechNumber(String smartTechNumber) {
        this.smartTechNumber = smartTechNumber;
    }

    public String getIMEI() {
        return this.IMEI;
    }

    public void setIMEI(String IMEI) {
        this.IMEI = IMEI;
    }

    public String getICCID() {
        return this.ICCID;
    }

    public void setICCID(String ICCID) {
        this.ICCID = ICCID;
    }

    public Set<Long> getStores() {
        return this.stores;
    }

    public void setStores(Set<Long> stores) {
        this.stores = stores;
    }
    

    @Override
    public String toString() {
        return "{" +
            " alarmPanelId='" + getAlarmPanelId() + "'" +
            ", panelNumber='" + getPanelNumber() + "'" +
            ", alarmPanelType='" + getAlarmPanelType() + "'" +
            ", TXID='" + getTXID() + "'" +
            ", smartTechNumber='" + getSmartTechNumber() + "'" +
            ", IMEI='" + getIMEI() + "'" +
            ", ICCID='" + getICCID() + "'" +
            ", stores='" + getStores() + "'" +
            "}";
    }

}

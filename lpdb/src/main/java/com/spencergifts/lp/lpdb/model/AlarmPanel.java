package com.spencergifts.lp.lpdb.model;

import java.util.HashSet;
import java.util.Set;

import com.spencergifts.lp.lpdb.enums.AlarmPanelType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "alarm_panels")
public class AlarmPanel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_panel_id", unique = true, nullable = false)
    private long alarmPanelId;

    @Column(name = "panel_number", nullable = false, length = 4)
    private String panelNumber;

    @Column(name = "panel_type", nullable = false)
    private AlarmPanelType alarmPanelType;

    @Column(name = "txid", nullable = false, length = 8)
    private String TXID; // format ....-....

    @Column(name = "smart_tech_number", nullable = false, length = 16)
    private String smartTechNumber;

    @Column(name = "imei", nullable = false, length = 15)
    private String IMEI; // 15-digit number

    @Column(name = "iccid", nullable = false, length = 20)
    private String ICCID; // 20-digit number

    // Define the many-to-many relationship with Store DO NOT WANT CascadeType.REMOVE
    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinTable(name = "store_alarm_panel", // Join table name
            joinColumns = @JoinColumn(name = "alarm_panel_id"), inverseJoinColumns = @JoinColumn(name = "store_id"))
    private Set<Store> stores = new HashSet<>();

    public AlarmPanel() {
    }

    public AlarmPanel(long alarmPanelId, String panelNumber, AlarmPanelType alarmPanelType, String TXID,
            String smartTechNumber, String IMEI, String ICCID) {
        this.alarmPanelId = alarmPanelId;
        this.panelNumber = panelNumber;
        this.alarmPanelType = alarmPanelType;
        this.TXID = TXID;
        this.smartTechNumber = smartTechNumber;
        this.IMEI = IMEI;
        this.ICCID = ICCID;
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

    public Set<Store> getStores() {
        return this.stores;
    }

    public void setStores(Set<Store> stores) {
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
                ", store='" + getStores() + "'" +
                "}";
    }

}
package com.spencergifts.lp.lpdb.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.spencergifts.lp.lpdb.enums.OrderState;
import com.spencergifts.lp.lpdb.enums.ShipToType;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable=false)
    private long orderId;

    @Enumerated(EnumType.STRING)
    @Column(name = "ship_to")
    private ShipToType shipTo;


    @Enumerated(EnumType.STRING)
    @Column(name = "order_state")
    private OrderState orderState;

    @Column(name = "date_created")
    @CreationTimestamp
    private LocalDateTime dateCreated;
    

    // // Adding ManyToOne relationship for store_id (foreign key to Store)]
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY)  // Many alarm codes can belong to one store
    @JoinColumn(name = "store_id", nullable = false)      // This defines the foreign key column in the alarm_codes table
    private Store store;   // Store entity reference
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @OneToMany(mappedBy = "order", 
              fetch = FetchType.LAZY, 
              cascade = CascadeType.ALL, 
              orphanRemoval = true) // delete orderItems made but keep product
    private List<OrderItem> orderItems = new ArrayList<OrderItem>();


    public Order() {
    }


    public Order(ShipToType shipTo, OrderState orderState, LocalDateTime dateCreated, Store store, List<OrderItem> orderItems) {
        this.shipTo = shipTo;
        this.orderState = orderState;
        this.dateCreated = dateCreated;
        this.store = store;
        this.orderItems = orderItems;
    }



    public long getOrderId() {
        return this.orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public ShipToType getShipTo() {
        return this.shipTo;
    }

    public void setShipTo(ShipToType shipTo) {
        this.shipTo = shipTo;
    }

    public OrderState getOrderState() {
        return this.orderState;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public LocalDateTime getDateCreated() {
        return this.dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public List<OrderItem> getOrderItems() {
        return this.orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
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
            " orderId='" + getOrderId() + "'" +
            ", shipTo='" + getShipTo() + "'" +
            ", orderState='" + getOrderState() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", store='" + getStore() + "'" +
            ", orderItems='" + getOrderItems() + "'" +
            "}";
    }

}

package com.spencergifts.lp.lpdb.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.spencergifts.lp.lpdb.enums.OrderState;
import com.spencergifts.lp.lpdb.enums.ShipToType;

public class OrderDto {

    private long orderId;
    private ShipToType shipTo;
    private OrderState orderState;
    private LocalDateTime dateCreated;
    private long storeId;   // Store entity reference
    private List<OrderItemDto> orderItems;


    public OrderDto() {
    }

    public OrderDto(long orderId, ShipToType shipTo, OrderState orderState, LocalDateTime dateCreated, long storeId, List<OrderItemDto> orderItems) {
        this.orderId = orderId;
        this.shipTo = shipTo;
        this.orderState = orderState;
        this.dateCreated = dateCreated;
        this.storeId = storeId;
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

    public long getStoreId() {
        return this.storeId;
    }

    public void setStoreId(long storeId) {
        this.storeId = storeId;
    }

    public List<OrderItemDto> getOrderItems() {
        return this.orderItems;
    }

    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
    }

    @Override
    public String toString() {
        return "{" +
            " orderId='" + getOrderId() + "'" +
            ", shipTo='" + getShipTo() + "'" +
            ", orderState='" + getOrderState() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", store='" + getStoreId() + "'" +
            ", orderItems='" + getOrderItems() + "'" +
            "}";
    }

}

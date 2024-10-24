package com.spencergifts.lp.lpdb.dto;

import com.spencergifts.lp.lpdb.model.Product;


public class OrderItemDto {

    private long orderItemId;
    private int quantity;
    private String comments;    
    private long orderId;
    private Product product;

    public OrderItemDto() {}


    public OrderItemDto(long orderItemId, int quantity, String comments, long orderId, Product product) {
        this.orderItemId = orderItemId;
        this.quantity = quantity;
        this.comments = comments;
        this.orderId = orderId;
        this.product = product;
    }

    public long getOrderItemId() {
        return this.orderItemId;
    }

    public void setOrderItemId(long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getComments() {
        return this.comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public long getOrderId() {
        return this.orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "{" +
            " orderItemId='" + getOrderItemId() + "'" +
            ", quantity='" + getQuantity() + "'" +
            ", comments='" + getComments() + "'" +
            ", orderId='" + getOrderId() + "'" +
            ", product='" + getProduct() + "'" +
            "}";
    }

}

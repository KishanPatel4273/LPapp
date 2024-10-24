package com.spencergifts.lp.lpdb.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_item")
public class OrderItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id", unique = true, nullable = false)
    private long orderItemId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "comments")
    private String comments;

    // don't delete order if a single orderItem is deleted
    @ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // never delete product
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    public OrderItem() {}


    public OrderItem(int quantity, String comments, Order order, Product product) {
        this.quantity = quantity;
        this.comments = comments;
        this.order = order;
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

    public Order getOrder() {
        return this.order;
    }

    public void setOrder(Order order) {
        this.order = order;
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
            ", orderId='" + getOrder().getOrderId() + "'" +
            ", product='" + getProduct() + "'" +
            "}";
    }
   
}

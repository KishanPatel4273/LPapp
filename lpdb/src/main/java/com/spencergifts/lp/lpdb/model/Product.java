package com.spencergifts.lp.lpdb.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", unique = true, nullable=false)
    private long productId;

    @Column(name = "name")
    private String name;

    @Column(name = "active")
    private boolean active;

    public Product() {
    }

    public Product(String name, boolean active) {
        this.name = name;
        this.active = active;
    }


    public long getProductId() {
        return this.productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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


    @Override
    public String toString() {
        return "{" +
            " productId='" + getProductId() + "'" +
            ", name='" + getName() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
    
}
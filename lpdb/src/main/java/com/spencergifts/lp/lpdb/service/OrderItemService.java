package com.spencergifts.lp.lpdb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.spencergifts.lp.lpdb.dto.OrderItemDto;
import com.spencergifts.lp.lpdb.model.Order;
import com.spencergifts.lp.lpdb.model.OrderItem;
import com.spencergifts.lp.lpdb.model.Product;
import com.spencergifts.lp.lpdb.repository.OrderItemRepository;
import com.spencergifts.lp.lpdb.repository.OrderRepository;
import com.spencergifts.lp.lpdb.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderItemService {
    
    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public List<OrderItem> findAll(){
        return this.orderItemRepository.findAll();
    }

    public Optional<OrderItem> findById(long id) {
        return this.orderItemRepository.findById(id);
    }   

    public OrderItem create(OrderItem orderItem) {
        // validate the order 
        Optional<Order> optionalOrder = this.orderRepository.findById(orderItem.getOrder().getOrderId());

        if (optionalOrder.isEmpty()) {
            throw new ResourceNotFoundException("Order not found");
        }
        
        Optional<Product> pOptional = this.productRepository.findById(orderItem.getProduct().getProductId());

        if (pOptional.isEmpty()) {
            throw new ResourceNotFoundException("Product not found");
        }

        Product product = pOptional.get();

        orderItem.setOrder(optionalOrder.get());
        orderItem.setProduct(product);

        return this.orderItemRepository.save(orderItem);
    }

    
    @Transactional
    public OrderItem update(OrderItem orderItem, long id) {
        Optional<OrderItem> optional = this.findById(id);

        if (optional.isEmpty()) {
            throw new ResourceNotFoundException("Order Item not Found");
        }

        OrderItem oi = optional.get();

        oi.setQuantity(orderItem.getQuantity());
        oi.setComments(orderItem.getComments());

        return this.orderItemRepository.save(oi);
    }

    public void delete(OrderItem orderItem) {
        this.orderItemRepository.delete(orderItem);
    }


    public static OrderItemDto convertToDto(OrderItem orderItem) {
        OrderItemDto orderItemDto = new OrderItemDto();

        orderItemDto.setOrderItemId(orderItem.getOrderItemId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setComments(orderItem.getComments());
        orderItemDto.setOrderId(orderItem.getOrder().getOrderId());
        orderItemDto.setProduct(orderItem.getProduct());

        return orderItemDto;
    }
}

package com.spencergifts.lp.lpdb.service;

import java.time.Year;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import com.spencergifts.lp.lpdb.dto.OrderDto;
import com.spencergifts.lp.lpdb.model.Order;
import com.spencergifts.lp.lpdb.model.OrderItem;
import com.spencergifts.lp.lpdb.model.Store;
import com.spencergifts.lp.lpdb.repository.OrderRepository;
import com.spencergifts.lp.lpdb.repository.StoreRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final StoreRepository storeRepository;
    private final OrderItemService orderItemService;

    OrderService(OrderRepository orderRepository, StoreRepository storeRepository, OrderItemService orderItemService) {
        this.orderRepository = orderRepository;
        this.storeRepository = storeRepository;
        this.orderItemService = orderItemService;
    }

    public List<Order> findAll() {
        return this.orderRepository.findAll();
    }

    public Optional<Order> findById(long id) {
        return this.orderRepository.findById(id);
    }

    public List<Order> findAllByStore(long storeId) {
        return this.orderRepository.findAll().stream()
        .filter(o -> o.getStore().getStoreId() == storeId)
        .collect(Collectors.toList());
    }

    public List<Order> findByNumberAndYear(int storeNumber, Year year) {
       return this.orderRepository.findAll().stream()
                .filter(o -> o.getStore().getStoreNumber() == storeNumber && o.getStore().getYear().equals(year))
                .collect(Collectors.toList());
    }

    public static OrderDto convertToDto(Order o) {
        OrderDto orderDto = new OrderDto();
        orderDto.setOrderId(o.getOrderId());
        orderDto.setShipTo(o.getShipTo());
        orderDto.setOrderState(o.getOrderState());
        orderDto.setDateCreated(o.getDateCreated());

        //store id
        orderDto.setStoreId(o.getStore().getStoreId());
        //get dtos
        orderDto.setOrderItems(o.getOrderItems().stream().map(oi -> OrderItemService.convertToDto(oi)).collect(Collectors.toList()));

        return orderDto;
    }

    public Order create(Order order) {
        // validate store
        Optional<Store> sOptional = this.storeRepository.findById(order.getStore().getStoreId());

        if (sOptional.isEmpty()) {
            throw new ResourceNotFoundException("Store not found!");
        }

        Store store = sOptional.get();
        order.setStore(store);
        // process orderItems if any
        List<OrderItem> orderItems = order.getOrderItems();

        order.setOrderItems(new ArrayList<OrderItem>());
        order = this.orderRepository.save(order);

        //@TODO add orderItems
        List<OrderItem>  loi = new ArrayList<OrderItem>();
        for (OrderItem oi : orderItems) {
            oi.setOrder(order);
            loi.add(this.orderItemService.create(oi));
        }

        order.setOrderItems(loi);
        return this.findById(order.getOrderId()).get();
    }

    @Transactional
    public void update(Order order, long order_id) {
        
        Optional<Order> orderOptional = this.findById(order_id);
    
        if(orderOptional.isEmpty()) {
            throw new ResourceNotFoundException("Order not found!");
        }

        Order o = orderOptional.get();

        o.setShipTo(order.getShipTo());
        o.setOrderState(order.getOrderState());
        
        this.orderRepository.save(o);
    } 

    public void delete(Order order) {
        
        this.orderRepository.delete(order);
    }

}

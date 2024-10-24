import { configHeaderJSON, deleteAPI, getAPI, postAPI, putAPI } from "./api"
import { orderItem } from "./orderItemAPI"

export type shipToType = 'DSM' | 'ZM' | 'STORE'
export type orderStateType = 'PLACED' | 'READY' | 'SHIPPED' | 'CANCELLED'

export type order = {
    orderId? : number,
    shipTo : shipToType,
    orderState : orderStateType,
    dateCreated? : string,

    storeId? : number,
    orderItems : orderItem[],
}

export const getOrders = async (): Promise<order[] | null> => {
    return await getAPI(`/api/orders`, 200)
}

export const getOrder = async (orderId : number): Promise<order | null> => {
    return await getAPI(`/api/orders/${orderId}`, 200)
}

export const getOrdersByStore = async (storeId : number): Promise<order[] | null> => {
    return await getAPI(`/api/orders/store/${storeId}`, 200)
}

export const createOrder = async (order : order): Promise<order | null> => {
    const data = JSON.stringify({
        shipTo : order.shipTo,
        orderState : order.orderState,
    
        store: {storeId : order.storeId,},
        orderItems : order.orderItems, 
    })
    return await postAPI(`/api/orders`, 201, data, configHeaderJSON, true)
}

export const updateOrder = async (order : order, orderId : number): Promise<order | null> => {
    const data = JSON.stringify({
        shipTo : order.shipTo,
        orderState : order.orderState,
    
        // storeId : order.storeId,
        // orderItems : order.orderItems, 
    })
    return await putAPI(`/api/orders/${orderId}`, 201, data, configHeaderJSON)
}

export const deleteOrder = async (orderId : number): Promise<order | null> => {
    return await deleteAPI(`/api/orders/${orderId}`, 200)
}
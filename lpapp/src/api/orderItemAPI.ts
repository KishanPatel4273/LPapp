import { configHeaderJSON, deleteAPI, postAPI, putAPI } from "./api"
import { product } from "./productAPI"


export type orderItem = {
    orderItemId? : number,
    quantity : number,
    comments: string,
    orderId? : number,
    product : product
}

export const createOrderItem = async (orderItem: orderItem, orderId: number): Promise<orderItem | null> => {
    const data = JSON.stringify({
        order : {orderId: orderId},
        quantity: orderItem.quantity,
        comments : orderItem.comments,
        product : orderItem.product
    })
    return await postAPI(`/api/orderitems`, 201, data, configHeaderJSON)
}

export const updateOrderItem = async (orderItem : orderItem, orderItemId : number): Promise<orderItem | null> => {
    const data = JSON.stringify({
        quantity: orderItem.quantity,
        comments : orderItem.comments,
    })
    return await putAPI(`/api/orderitems/${orderItemId}`, 201, data, configHeaderJSON)
}

export const deleteOrderItem = async (orderItemId : number): Promise<orderItem | null> => {
    return await deleteAPI(`/api/orderitems/${orderItemId}`, 200)
}
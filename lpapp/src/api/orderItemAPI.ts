import { product } from "./productAPI"


export type orderItem = {
    orderItemId? : number,
    quantity : number,
    comments: string,
    orderId? : number,
    product : product
}
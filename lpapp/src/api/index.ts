import { getStore, getStores } from "./StoreAPI"
import type { store, zm, dsm, storeType } from "./StoreAPI";

import { createAlarmCode, deleteAlarmCode, updateAlarmCode } from "./AlarmAPI";
import type { alarmCode, position } from "./AlarmAPI"

import { getAlarmPanels, createAlarmPanel, updateAlarmPanel, addStoreToAlarmPanel, deleteAlarmPanel } from "./AlarmPanelAPI";
import type { alarmPanel, alarmPanelType } from "./AlarmPanelAPI"

import { getProducts, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./productAPI";
import type { product } from "./productAPI";

import { createOrderItem, updateOrderItem, deleteOrderItem } from "./orderItemAPI";
import type { orderItem } from "./orderItemAPI";


import { getOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersByStore } from "./orderAPI";
import type { shipToType, orderStateType, order } from "./orderAPI";

export {
    store,
    zm,
    dsm,
    storeType,
    getStores,
    getStore,

    alarmCode,
    position,
    createAlarmCode,
    deleteAlarmCode,
    updateAlarmCode,

    alarmPanel,
    alarmPanelType,
    getAlarmPanels,
    createAlarmPanel,
    updateAlarmPanel,
    addStoreToAlarmPanel,
    deleteAlarmPanel,

    product,
    getProducts,
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,

    orderItem,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,

    shipToType,
    orderStateType,
    order,
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersByStore,

}
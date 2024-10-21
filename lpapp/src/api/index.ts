import { getStore, getStores } from "./StoreAPI"
import type { store, zm, dsm, storeType } from "./StoreAPI";

import { createAlarmCode, deleteAlarmCode, updateAlarmCode } from "./AlarmAPI";
import type { alarmCode, position } from "./AlarmAPI"

import { getAlarmPanels, createAlarmPanel, updateAlarmPanel, addStoreToAlarmPanel, deleteAlarmPanel } from "./AlarmPanelAPI";
import type { alarmPanel, alarmPanelType } from "./AlarmPanelAPI"

import { getProducts, getAllProducts, getProduct, createProducts, updateProducts, deleteProduct } from "./productAPI";
import type { product } from "./productAPI";

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
    createProducts, 
    updateProducts, 
    deleteProduct

}